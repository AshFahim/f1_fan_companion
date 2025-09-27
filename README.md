# F1 Fan Companion - Flutter App

A Flutter mobile application that replicates the premium Formula 1 login experience from the React WebApp. This app features a beautiful, animated login screen with F1-themed design elements.

## Features

- **Animated Background**: Dynamic speed lines, checkered patterns, and racing curves
- **Premium UI Design**: Glassmorphism effects and gradient text
- **Dual Mode Toggle**: Switch between "Start Engine" (Login) and "Join the Grid" (Sign Up)
- **Form Validation**: Email and password validation with error handling
- **Country Selection**: Dropdown for country selection during sign up
- **Guest Mode**: Continue as guest option
- **Premium Features Preview**: Showcase of app features
- **Responsive Design**: Works on both mobile and web platforms
- **Dark/Light Theme**: Automatic theme switching based on system preferences

## Screenshots

The app features:
- F1-themed logo with racing flag emoji
- Animated background with speed lines and checkered patterns
- Glassmorphic login form with premium styling
- Smooth animations and transitions
- Professional F1 color scheme (Red Bull inspired)

## Getting Started

### Prerequisites

- Flutter SDK (3.9.2 or higher)
- Dart SDK
- Chrome browser (for web development)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd f1_fan_companion
```

2. Install dependencies:
```bash
flutter pub get
```

3. Run the app:
```bash
# For web
flutter run -d chrome

# For mobile (if device connected)
flutter run
```

### Dependencies

- `google_fonts`: For Space Grotesk and Inter fonts
- `flutter_animate`: For smooth animations
- `glassmorphism`: For glassmorphic UI effects

## Project Structure

```
lib/
├── main.dart                 # App entry point
├── theme/
│   └── app_theme.dart       # Theme configuration with F1 colors
├── screens/
│   └── login_screen.dart    # Main login/signup screen
└── widgets/
    └── animated_background.dart # Animated background components
```

## Design Features

### Color Scheme
- Primary: Red Bull Blue (#1E40AF)
- Secondary: Muted grays and whites
- Accent colors for different F1 teams

### Typography
- Headers: Space Grotesk (premium, modern)
- Body text: Inter (clean, readable)

### Animations
- Speed lines moving across the screen
- Rotating checkered pattern
- Smooth form transitions
- Gradient text effects

## Future Enhancements

- Backend integration for authentication
- User profile management
- F1 race predictions
- Live race updates
- Driver statistics
- Team comparisons
- Push notifications

## Development Notes

The app is built with Flutter 3.9.2 and follows Material Design 3 principles. The login screen is designed to match the premium feel of the original React WebApp while leveraging Flutter's native performance and animations.

## License

This project is for educational purposes and is not affiliated with Formula 1®.