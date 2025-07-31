# WasteTrack+

WasteTrack+ is a smart waste management prototype built with **React Native** that enables communities and authorities to monitor waste bin usage, track overflow events, and report waste hotspots. The app is designed to simulate IoT behavior and prepare for real-world integration with bin sensors.


## 📱 Features

View nearby bins with real-time simulated fill levels
Overflow detection with animated bin alerts
Register new waste collection bins (admin functionality)
Simulated auto-fill updates (to represent real-time sensor input)
Add & list waste dumping hotspots
Visualize bin fill history with dynamic charts
Ready for demo and presentation
Future integration with IoT sensors via microcontrollers


## Tech Stack

**React Native** (TypeScript)
**React Navigation**
**Victory Native** for data charts
**AsyncStorage** for local data persistence
**Wokwi** (planned) for simulating IoT bin fill data

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/MercyJoshua/WasteTrackPlus.git
cd wastetrackplus

### 2. Install dependencies

npm install
# or
yarn install


### 3. Run the app

For Android:

npx react-native run-android

For iOS:

npx pod-install
npx react-native run-ios

Simulated Behavior

Bins are pre-populated with random fill levels and update every few seconds to simulate real-time changes. Overflowing bins will pulse and highlight in red, mimicking sensor-triggered alerts.

You can also register new bins manually, which is currently placed in the same app as admin features due to time constraints.

Future Work

    Separate user/admin interfaces

    Assign bins to workers for collection tracking

    Wokwi Integration
    In the next iteration, WasteTrack+ will connect to physical bins via IoT devices (e.g. ESP32 with ultrasonic sensors).
    Simulations will be tested using Wokwi to emulate fill level data in real time and push updates to the app.