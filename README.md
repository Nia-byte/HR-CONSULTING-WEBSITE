# Velvet & Edge Solutions

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Platform](https://img.shields.io/badge/platform-Web-green.svg)
![Status](https://img.shields.io/badge/status-Live-success.svg)
![Netlify](https://img.shields.io/badge/hosting-Netlify-00C7B7.svg)

A modern, professional website for Velvet & Edge Solutions - a full-service HR consultancy specializing in recruitment, training, and workforce development solutions across South Africa.

**Live Site:** [https://velvetedgesolutions.co.za/](https://velvetedgesolutions.co.za/)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Pages](#pages)
- [Key Components](#key-components)
- [Backend Services](#backend-services)
- [Installation & Setup](#installation--setup)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [Contact Form Integration](#contact-form-integration)
- [Booking System](#booking-system)
- [Browser Support](#browser-support)
- [Performance](#performance)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## 🎯 Overview

**Velvet & Edge Solutions** is a HR consulting platform designed to connect businesses with top-tier talent and provide strategic workforce development solutions. The website showcases the company's services, facilitates consultation bookings, and enables direct communication with potential clients.

### Key Highlights

- **Professional Design**: Modern, responsive design with smooth animations and interactions
- **Consultation Booking System**: Interactive calendar-based booking with real-time availability
- **Multi-Service Platform**: Showcases recruitment, training, HR consulting, and change management services
- **Contact Integration**: SendGrid-powered email system for seamless communication
- **Mobile-First**: Fully responsive design optimized for all devices
- **Performance Optimized**: Fast loading times with optimized assets

## ✨ Features

### Homepage Features
- **Hero Section**: Dynamic animated text and engaging visuals
- **Service Showcase**: Comprehensive overview of all service offerings
- **Industry Expertise**: Clear presentation of specialized industries
- **Call-to-Action**: Strategic CTA placements throughout the page
- **Mobile Navigation**: Smooth mobile menu with overlay design
- **Testimonial Carousel**: Rotating client testimonials and deliverables
- **Values Section**: Animated presentation of company principles

### About Page Features
- **Company Story**: Detailed journey and milestone timeline
- **Mission & Vision**: Clear articulation of company goals
- **Achievements**: Visual representation of company statistics
- **Service Breakdown**: In-depth exploration of each service area
- **FAQ Section**: Interactive accordion-style frequently asked questions
- **Industry Specialization**: Detailed industry expertise showcase

### Contact Page Features
- **Contact Form**: Multi-field form with validation
- **Direct Contact Info**: Phone, email, and address display
- **Bot Protection**: reCAPTCHA integration for spam prevention
- **Email Notifications**: Automated email confirmations via SendGrid
- **Inquiry Types**: Categorized contact options

### Booking System Features
- **Interactive Calendar**: Month navigation with date selection
- **Time Slot Selection**: Available time slots displayed dynamically
- **Multi-Step Form**: Comprehensive booking information collection
- **Platform Selection**: Choice between Teams, Zoom, or phone call
- **Email Confirmations**: Automated booking confirmations to both parties
- **Timezone Display**: Clear timezone information (CAT)

## 🛠 Technology Stack

### Frontend Technologies
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox and Grid
- **JavaScript (ES6+)** - Interactive functionality
- **Responsive Design** - Mobile-first approach

### Backend Services
- **Netlify Functions** - Serverless backend for form handling
- **SendGrid API** - Email delivery service
- **Node.js** - Runtime for serverless functions

### Design & UI
- **Custom CSS Animations** - Smooth transitions and effects
- **SVG Icons** - Scalable vector graphics
- **Web Fonts** - Custom typography
- **Intersection Observer API** - Scroll-based animations

### Hosting & Deployment
- **Netlify** - Static site hosting and serverless functions
- **Custom Domain** - velvetedgesolutions.co.za
- **SSL/TLS** - Secure HTTPS connections
- **CDN** - Global content delivery

## 📁 Project Structure

```
velvet-edge-solutions/
├── index.html                          # Homepage
├── Homepage/
│   ├── style.css                       # Homepage styles
│   └── script.js                       # Homepage JavaScript
├── about-page/
│   ├── about.html                      # About page
│   ├── about.css                       # About page styles
│   └── about-script.js                 # About page JavaScript
├── contact-page/
│   ├── contact.html                    # Contact page
│   ├── contact.css                     # Contact page styles
│   └── contact.js                      # Contact page JavaScript
├── images/
│   ├── V&E LOGO.PNG                    # Company logo
│   ├── IMG_8956_PhotoGrid.png          # Team photo
│   └── favicon.ico                     # Site favicon
├── netlify/
│   └── functions/
│       ├── send-booking-email.js       # Booking email handler
│       └── send-contact-email.js       # Contact form email handler
├── privacy-policy/
│   └── index.html                      # Privacy policy page
├── netlify.toml                        # Netlify configuration
├── package.json                        # Node dependencies
└── README.md                           # This file
```

## 📄 Pages

### 1. Homepage (`/index.html`)
**Purpose**: Main landing page showcasing services and company overview

**Sections**:
- Hero section with animated text
- Service simplification overview
- Customer/Staff cards
- Core services breakdown
- Training & skills development
- Recruitment & placements
- HR consulting
- Change management
- About section
- Values & principles
- What we deliver carousel
- Growth steps section
- Footer with newsletter signup

### 2. About Page (`/about-page/about.html`)
**Purpose**: Detailed company information and service descriptions

**Sections**:
- Company hero section
- Journey milestones (8 years, 100+ placements)
- Mission, Vision, Values
- Sustainable solutions approach
- CETA accreditation details
- Training & skills development
- Recruitment services
- HR consulting breakdown
- Change management
- FAQ section
- Footer

### 3. Contact Page (`/contact-page/contact.html`)
**Purpose**: Client communication and inquiry submission

**Sections**:
- Contact hero section
- Contact information display
- Contact form with validation
- Individual/Organization selection
- Footer

## 🔑 Key Components

### Booking Modal Component
**Features**:
- Calendar date selection
- Time slot availability
- Multi-step form progression
- Platform selection (Teams/Zoom/Phone)
- Form validation
- Loading states

**Sections**:
1. Date & time selection
2. Contact information
3. Meeting details
4. Confirmation

### Contact Form Component
**Features**:
- Field validation
- Email format checking
- Individual/Organization toggle
- reCAPTCHA verification
- Success/error messaging
- Loading indicators

### Service Cards Component
**Features**:
- Hover effects
- Icon displays
- Responsive grid layout
- Animation on scroll

## 🔧 Backend Services

### Netlify Functions

#### 1. Booking Email Handler (`send-booking-email.js`)

**Purpose**: Processes consultation booking requests and sends confirmation emails

**Functionality**:
- Validates booking form data
- Sends confirmation email to client
- Sends notification email to admin
- Handles API key authentication
- CORS-enabled for cross-origin requests

**Email Details**:
- **To Client**: Booking confirmation with details
- **To Admin**: New booking notification with full information
- **Template**: HTML formatted with inline CSS

### SendGrid Integration

**Configuration**:
```
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
```

**Email Templates**:
- Professional HTML templates
- Responsive design
- Brand colors (#dc4c94)
- Company logo integration
- Mobile-optimized

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- SendGrid account
- Netlify account (for deployment)

### Local Development Setup

1. **Clone the repository**
```
git clone https://github.com/your-username/velvet-edge-solutions.git
cd velvet-edge-solutions
```

2. **Install dependencies**
```
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:
```
SENDGRID_API_KEY=your_sendgrid_api_key_here
ADMIN_EMAIL=info@velvetandedge.co.za
```

4. **Install Netlify CLI** (for local function testing)
```
npm install -g netlify-cli
```

5. **Run local development server**
```
netlify dev
```

6. **Access the site**
Open `http://localhost:8888` in your browser


## 📧 Contact Form Integration

### Form Submission Flow

1. **User fills out form**
   - Validates required fields
   - Checks email format
   - Verifies reCAPTCHA (if enabled)

2. **JavaScript submission handler**

3. **Netlify function processes request**
   - Validates data
   - Sends emails via SendGrid
   - Returns success/error response

4. **User receives confirmation**
   - Success message displayed
   - Confirmation email sent
   - Form resets

### Email Templates

**Client Confirmation Email**:
- Subject: "Velvet & Edge Solutions - Query Received"
- Content: Acknowledgment and submitted details
- Call-to-action: Contact information for urgent matters

**Admin Notification Email**:
- Subject: "New Query Form Submission - [Name]"
- Content: Full inquiry details
- Call-to-action: Follow up reminder

## 📅 Booking System

### Calendar Component

**Features**:
- Month navigation (previous/next)
- Current date highlighting
- Disabled past dates
- Selected date styling
- Timezone display (CAT)

### Time Slot Selection

**Available Times**:
- 8:00 AM - 5:00 PM
- 30-minute intervals
- Excludes lunch (12:00 - 1:00 PM)


### Booking Form Data

**Collected Information**:
- Personal details (name, email, phone)
- Meeting preferences (date, time, platform)
- Business context (optional)
- Support needs (required)
- Meeting preparation info (optional)
- Referral source

### Form Validation

**Rules**:
- Required fields marked with asterisk
- Email format validation
- Phone number validation
- Date/time selection required
- Platform selection required
- Character limits on text areas

## 🌐 Browser Support

### Supported Browsers

| Browser | Version |
|---------|---------|
| Chrome | Latest 2 versions |
| Firefox | Latest 2 versions |
| Safari | Latest 2 versions |
| Edge | Latest 2 versions |
| Mobile Safari | iOS 12+ |
| Chrome Mobile | Latest version |


## ⚡ Performance

### Optimization Techniques

1. **Image Optimization**
   - Compressed images
   - Appropriate formats (PNG, JPG, SVG)
   - Lazy loading for below-fold images

2. **CSS Optimization**
   - Minified CSS in production
   - Critical CSS inlined
   - Unused CSS removed

3. **JavaScript Optimization**
   - Minified JS in production
   - Deferred non-critical scripts
   - Async loading where appropriate

4. **Caching Strategy**
   - Static assets cached by CDN
   - Cache-Control headers configured



## 📄 License

This project is proprietary and confidential.

```
Copyright (c) 2025 Nia Diale

All rights reserved. This website and its content are the property of 
Velvet & Edge Solutions. No part of this website may be reproduced, 
distributed, or transmitted in any form without prior written permission.
```

### Support

For website issues or technical support:
1. Check the FAQ section on the About page
2. Email: dialeniia@gmail.com
3. Call during business hours: 8:00 AM - 5:00 PM CAT

## 🙏 Acknowledgments

- **Design**: Nia Diale®
- **Development**: Nia Diale®
- **Hosting**: Netlify
- **Email Service**: SendGrid
- **Icons**: Custom SVG icons
- **Fonts**: System fonts for optimal performance

## 📚 Additional Resources

### Documentation Links
- [Netlify Functions Documentation](https://docs.netlify.com/functions/overview/)
- [SendGrid API Documentation](https://docs.sendgrid.com/api-reference)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

### Related Projects
- [Netlify Build Plugins](https://www.netlify.com/products/build/plugins/)
- [SendGrid Email Templates](https://sendgrid.com/solutions/email-templates/)


