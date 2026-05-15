// --- 3D Scene Setup using Three.js ---
const container = document.getElementById('canvas-container');

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x0b0f19, 0.001);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 400;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// Create Particle Sphere
const geometry = new THREE.BufferGeometry();
const particlesCount = 5000;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i+=3) {
    // Spherical distribution
    const r = 200;
    const theta = 2 * Math.PI * Math.random();
    const phi = Math.acos(2 * Math.random() - 1);
    
    posArray[i] = r * Math.sin(phi) * Math.cos(theta); // x
    posArray[i+1] = r * Math.sin(phi) * Math.sin(theta); // y
    posArray[i+2] = r * Math.cos(phi); // z
}

geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const material = new THREE.PointsMaterial({
    size: 2.5,
    color: 0x00ffcc,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(geometry, material);
scene.add(particlesMesh);

// Animation Loop
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX / window.innerWidth - 0.5;
    mouseY = event.clientY / window.innerHeight - 0.5;
});

const animate = () => {
    requestAnimationFrame(animate);
    
    particlesMesh.rotation.y += 0.002;
    particlesMesh.rotation.x += 0.001;
    
    // Interactive camera
    camera.position.x += (mouseX * 200 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 200 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


// --- UI Logic ---
const inputs = ['gdp', 'social', 'health', 'freedom'];

inputs.forEach(id => {
    const el = document.getElementById(id);
    const valEl = document.getElementById(`${id}-val`);
    el.addEventListener('input', (e) => {
        valEl.textContent = e.target.value;
    });
});

const predictBtn = document.getElementById('predict-btn');
const resultEl = document.getElementById('result');

predictBtn.addEventListener('click', async () => {
    // Add loading state
    predictBtn.textContent = 'Analyzing...';
    predictBtn.style.opacity = '0.7';
    
    // Pulse effect on 3d
    material.color.setHex(0xff007f);
    
    const payload = {
        gdp: parseFloat(document.getElementById('gdp').value),
        social_support: parseFloat(document.getElementById('social').value),
        healthy_life: parseFloat(document.getElementById('health').value),
        freedom: parseFloat(document.getElementById('freedom').value)
    };
    
    try {
        const response = await fetch('/api/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        
        const data = await response.json();
        
        if (data.prediction !== undefined) {
            resultEl.textContent = data.prediction;
            // animate result
            resultEl.animate([
                { transform: 'scale(1)', opacity: 0.5 },
                { transform: 'scale(1.2)', opacity: 1 },
                { transform: 'scale(1)', opacity: 1 }
            ], { duration: 500 });
        } else {
            resultEl.textContent = "Error";
        }
    } catch (err) {
        console.error(err);
        resultEl.textContent = "Error";
    } finally {
        predictBtn.textContent = 'Predict Impact';
        predictBtn.style.opacity = '1';
        
        setTimeout(() => {
            material.color.setHex(0x00ffcc);
        }, 1000);
    }
});

// Load Data Insights
async function loadInsights() {
    try {
        const res = await fetch('/api/data');
        const data = await res.json();
        
        if (data && data.length > 0) {
            document.getElementById('count-countries').textContent = data.length;
            
            const avgGdp = data.reduce((acc, curr) => acc + curr['GDP per capita'], 0) / data.length;
            document.getElementById('avg-gdp').textContent = avgGdp.toFixed(2);
            
            const avgHealth = data.reduce((acc, curr) => acc + curr['Healthy life expectancy'], 0) / data.length;
            document.getElementById('avg-health').textContent = avgHealth.toFixed(2);
            
            const avgInf = data.reduce((acc, curr) => acc + curr['Max_infection_rates'], 0) / data.length;
            document.getElementById('avg-infection').textContent = avgInf.toFixed(0);
        }
    } catch(err) {
        console.error("Could not load insights", err);
    }
}

loadInsights();
