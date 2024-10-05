# AI-Powered Carbon Footprint Tracker

Welcome to the *AI-Powered Carbon Footprint Tracker* repository, developed for the IEEE Hackathon. This project leverages AI and machine learning to help individuals and businesses track and reduce their carbon emissions in real-time.

## Links
 video-link : https://drive.google.com/file/d/1Rk5DLed74wyYvAcLcFMdpu2P_BCkl7sf/view?usp=sharing
 pdf-link : https://docs.google.com/presentation/d/1_UOyPvVQGn8UxzKexnhWCfIW5ImEI3nu/edit?usp=sharing&ouid=100120393893229249001&rtpof=true&sd=true

## Project Overview

Climate change is one of the most pressing issues of our time, and reducing carbon emissions is crucial for mitigating its effects. Our AI-powered application provides a solution by allowing users to monitor their carbon footprint across various activities such as home energy consumption, transportation, food choices, and waste management. With real-time tracking and personalized insights, users can take actionable steps to reduce their carbon emissions.

## Features

- *Real-Time Carbon Tracking*: Automatically calculates carbon emissions from everyday activities, such as energy usage, transportation, and food consumption.
- *Personalized Suggestions*: Provides tailored recommendations based on user habits to reduce emissions effectively.
- *Integration with IoT Devices*: Works with smart meters and wearable devices for real-time data collection.
- *Progress Tracking*: Visualizes trends in carbon emissions over time, allowing users to set reduction goals and measure their progress.
- *AI & Machine Learning*: Uses AI algorithms to deliver accurate carbon footprint calculations and suggest predictive insights for emission reduction.

## Key Components

1. *Energy Consumption (Home & Appliances)*:
   - Tracks electricity usage, heating, and cooking fuel consumption.
   - Formula: CO2 emissions = kWh used × CO2 per kWh (regional factor)

2. *Transportation*:
   - Calculates emissions based on personal vehicle use and public transport.
   - Formula: CO2 emissions = (Distance traveled / Fuel efficiency) × CO2 per unit of fuel

3. *Food Consumption*:
   - Calculates emissions from various food types (e.g., meat-heavy vs. plant-based diets).
   - Formula: CO2 emissions from food = ∑(Amount of food × CO2 per kg of that food)

4. *Waste Production*:
   - Tracks waste disposal methods and calculates the associated carbon emissions.
   - Formula: CO2 emissions ≈ 0.2-0.5 kg per kg of waste

5. *Goods & Services*:
   - Embedded carbon footprint from purchasing items like electronics and clothing.

## System Architecture

The system integrates data from multiple sources:
- *Data Input*: Sensors, IoT devices, and manual input for energy use, transportation, and consumption.
- *AI & Machine Learning Models*: Calculate emissions using regional factors, predict future emissions, and suggest actions.
- *Dashboard*: User-friendly interface presenting real-time insights and progress tracking.

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/bravo1goingdark/IEEE-Hackathon.git
   cd IEEE-Hackathon