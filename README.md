# GitHub Statistics Viewer

A comprehensive cross-platform mobile application built with **React Native** and **Expo** that provides detailed GitHub analytics and user insights. This app enables users to explore GitHub profiles, repository statistics, contribution metrics, and pull request data by simply entering a GitHub username.

---

## Features

### User Profile Information
- Search and retrieve any public GitHub user profile by username
- Display comprehensive profile details including:
  - Full name and username
  - User biography
  - Follower and following counts
  - Total public repositories

### Repository Analytics
- View a complete list of all public repositories for any user
- Direct links to each repository on GitHub for easy navigation
- Repository count and overview

### Contribution Metrics
- Calculate total stars received across all public repositories
- Track total number of pull requests created by the user
- Count merged pull requests to measure successful contributions
- Automatic filtering of invalid or missing data for accurate statistics

### Platform Support
- Cross-platform compatibility (iOS and Android)
- Pre-built APK available for direct installation on Android devices
- Responsive design optimized for mobile viewing

---

## Technology Stack

- **Framework**: React Native with Expo
- **Language**: JavaScript (React)
- **API**: GitHub REST API v3
- **UI Components**: React Native core components
- **Icons**: Expo Vector Icons (Ionicons)

---

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Expo CLI (optional, for development)

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Git-Stat-APK
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure GitHub API token:
   - Create a `.env` file or update `app.config.js`
   - Add your GitHub personal access token for higher API rate limits

4. Run the application:
   ```bash
   npm start
   ```

### Android APK Installation
- Download the pre-built APK from the releases section
- Enable "Install from Unknown Sources" in your Android device settings
- Install the APK file directly on your Android device

---

## Usage

1. Launch the application on your device
2. Enter a valid GitHub username in the search field
3. Tap the "Fetch GitHub Data" button
4. View the retrieved statistics including:
   - User profile information
   - Repository list with clickable links
   - Aggregated statistics (stars, PRs, merged PRs)
5. Tap on any repository name or profile link to open it in your browser

---

## API Integration

This application uses the GitHub REST API v3 to fetch user data. The following endpoints are utilized:

- `/users/{username}` - User profile information
- `/users/{username}/repos` - Repository list
- `/search/repositories` - Star count aggregation
- `/search/issues` - Pull request data
- `/users/{username}/events` - User activity events

**Note**: GitHub API has rate limits. Using a personal access token is recommended for development to increase the rate limit from 60 to 5,000 requests per hour.


