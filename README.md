# covid19-analysis-by---ML

A comprehensive machine learning analysis of COVID-19 pandemic data, combining confirmed cases, deaths, and happiness metrics to uncover patterns and trends across global populations.

## Key Features

- **Data Integration**: Combines COVID-19 confirmed cases, death statistics, and worldwide happiness index.
- **Exploratory Data Analysis (EDA)**: In-depth statistical analysis and visualization of pandemic trends.
- **Machine Learning Models**: Predictive modeling using various ML algorithms including Random Forest to predict maximum infection rates.
- **Multi-dimensional Analysis**: Correlates pandemic impact with global happiness metrics.
- **Interactive Visualizations**: Clear and insightful charts for trend identification.
- **FastAPI Backend**: A lightweight, fast Python backend that serves ML predictions and dataset insights.
- **Interactive 3D UI**: A futuristic, Neumorphic frontend built with Vanilla JS and Three.js, featuring an interactive particle globe and real-time inference.

## Dataset Information

This project uses three primary datasets:

1. **covid19_Confirmed_dataset.csv**: Global COVID-19 confirmed cases by country and date.
2. **covid19_deaths_dataset.csv**: COVID-19 death statistics by country and date.
3. **worldwide_happiness_report.csv**: World Happiness Index metrics for correlation analysis.

## Technologies & Libraries Used

- **Python 3.x**
- **Pandas & NumPy**: Data manipulation and analysis
- **Scikit-learn**: Machine learning algorithms
- **Matplotlib & Seaborn**: Data visualization
- **Jupyter Notebook**: Interactive analysis environment
- **FastAPI & Uvicorn**: Backend API and model serving
- **Three.js**: 3D particle globe visualizations in the frontend

## Project Structure

```
covid19-analysis-by---ML/
├── COVID-19 Data Analysis.ipynb       # Main analysis notebook
├── app.py                             # FastAPI Backend Server
├── train_model.py                     # ML pipeline for training the model
├── static/                            # Frontend UI Directory
│   ├── index.html                     # 3D UI HTML
│   ├── style.css                      # UI Styles & Neumorphism
│   └── main.js                        # Three.js animation & API calls
├── model.pkl & scaler.pkl             # Pretrained model files
├── covid19_Confirmed_dataset.csv      # Confirmed cases data
├── covid19_deaths_dataset.csv         # Deaths data
├── worldwide_happiness_report.csv     # Happiness metrics
└── README.md                          # Project documentation
```

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/HarshChoudhary2003/covid19-analysis-by---ML.git
   cd covid19-analysis-by---ML
   ```

2. **Install dependencies**
   ```bash
   pip install pandas numpy scikit-learn matplotlib seaborn jupyter fastapi uvicorn joblib
   ```

3. **Run Data Analysis (Optional)**
   ```bash
   jupyter notebook
   ```
   Open `COVID-19 Data Analysis.ipynb` to view the EDA.

4. **Run the 3D AI UI Application**
   First, train the model to generate the pickle files:
   ```bash
   python train_model.py
   ```
   Next, run the FastAPI backend:
   ```bash
   python app.py
   ```
   Finally, open your browser to `http://localhost:8000` to interact with the 3D AI Prediction Interface.

## Author

**Harsh Choudhary**
- GitHub: [@HarshChoudhary2003](https://github.com/HarshChoudhary2003)
- Location: Mandi, Himachal Pradesh, India

## License

This project is open source and available under the MIT License.

## Disclaimer

This analysis is for educational and research purposes. The data and models are provided as-is without warranties. Please verify findings with official health organization reports.
