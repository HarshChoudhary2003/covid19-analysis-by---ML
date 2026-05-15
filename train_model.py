import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler

def main():
    # 1. Load Datasets
    confirmed_df = pd.read_csv("covid19_Confirmed_dataset.csv")
    happiness_df = pd.read_csv("worldwide_happiness_report.csv")
    
    # 2. Process Confirmed Cases
    confirmed_df.drop(["Lat", "Long", "Province/State"], axis=1, inplace=True, errors="ignore")
    corona_agg = confirmed_df.groupby("Country/Region").sum(numeric_only=True)
    
    # Calculate max infection rate (max daily increase)
    # The columns are dates. We transpose, calculate diff, then max for each country.
    # Note: groupby("Country/Region").sum() gives countries as index and dates as columns
    max_infection_rates = corona_agg.diff(axis=1).max(axis=1)
    corona_data = pd.DataFrame(max_infection_rates, columns=["Max_infection_rates"])
    
    # 3. Process Happiness Report
    useless_cols = ["Overall rank", "Score", "Generosity", "Perceptions of corruption"]
    happiness_df.drop(useless_cols, axis=1, inplace=True, errors="ignore")
    happiness_df.set_index("Country or region", inplace=True)
    
    # 4. Join datasets
    data = corona_data.join(happiness_df, how="inner")
    
    # Drop NA just in case
    data.dropna(inplace=True)
    
    # 5. Define features and target
    X = data[["GDP per capita", "Social support", "Healthy life expectancy", "Freedom to make life choices"]]
    y = data["Max_infection_rates"]
    
    # Scale features
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    # Train test split
    X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)
    
    # Train Model
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    print(f"R^2 Score on test set: {model.score(X_test, y_test)}")
    
    # 6. Save model and scaler
    joblib.dump(model, "model.pkl")
    joblib.dump(scaler, "scaler.pkl")
    
    # Save the processed dataset for the UI to display scatter plot data
    data.to_csv("processed_data.csv")
    print("Model, scaler, and processed_data saved.")

if __name__ == "__main__":
    main()
