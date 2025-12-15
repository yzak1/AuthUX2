# User Story to URL Mapping

This document maps the Product Requirement User Stories to the specific application routes where they are implemented.

## 1.0 Authentication
- **1.10.1.a** (Okta FastPass): `/login` (Login Method Selector component)
- **1.10.1.b** (Passkey): `/login` (Login Method Selector component)
- **1.10.1.e** (Remember Me): `/login` (Login Method Selector component)
- **1.10.1.c** (Persist Login State): Global (Session Management)
- **1.10.1.d** (Reasonable Token Life): Global (Session Management)
- **1.10.1.f** (Single Sign-On): Global (Simulated via AuthContext)

## 0.0 Onboarding & Engagement
- **0.02.a** (Onboarding Checklist): `/` (Dashboard Widget)
- **0.04.d** (Portal Introduction): `/` (Modal Overlay on First Login)
- **0.01.a** (Dashboard Current State): `/` (Dashboard Layout)
- **0.01.c** (Staff-Curated Widgets): `/` (Dashboard Layout)

## 2.0 Student Priorities & Planning
- **2.06.1.e** (My Priorities Widget): `/` (Dashboard Widget)
- **2.09.g** (Urgent Announcement): `/` (Global Modal Alert)
- **2.06.1.a** (Canvas Deadline Integration): `/calendar` (Unified Calendar View)
- **2.06.1.b** (Integrated Academic Calendar): `/calendar` (Unified Calendar View)
- **2.06.1.f** (Personalised Key Dates): `/calendar` (Unified Calendar View)
- **2.06.1.g** (Calendar Subscriptions): `/calendar` (Subscription Manager)
- **4.09.a** (MyTimetable Overview): `/calendar` (Status Panel)
- **2.11.d** (Upcoming Assessments): `/assessments` (Assessments Page)

## 2.0 Communication
- **2.09.a** (Announcements UX): `/messages` (Inbox Page)
- **2.09.d** (Notices UX): `/messages` (Inbox Page)
- **2.09.e** (Notices Overview): `/` (Notices Dashboard Widget)

## 2.0 Academic Progress
- **2.11.a** (Subject Results): `/units` (Subject Results List)
- **2.11.b** (Real-time Grades): `/units` (Canvas Grades List)
- **2.11.c** (Course Progress): `/units` (Course Progress Tracker)
- **4.05.a** (Enrolment Status): `/units` (Enrolment Snapshot)

## 3.0 Search & Wayfinding
- **3.02.1.a** (Global Search): Global Header (Search Bar & Overlay)
- **3.03.1.b** (Campus Map): `/` (Dashboard Shortcut)

## 5.0 Core Navigation & Shell
- **5.05.c** (Primary Navigation): Global Shell (Sidebar/Drawer)
- **5.05.d** (Profile Menu): Global Header (Profile Trigger)
- **5.05.a** (Ecosystem Navigation): `/` (Dashboard & Sidebar Links)
- **5.05.f** (Quick Links Widget): `/` (Dashboard Widget)
- **5.05.h** (Topic Landing Page): `/topic/:topicId`
- **1.04.a** (Access via Mobile Web): Global (Responsive Layouts)

## 6.0 Support & Admin
- **6.02.1.d** (Unified Enquiries): `/` (Dashboard Enquiries Widget)
- **5.09.b** (Enquiries Progress): `/` (Dashboard Enquiries Widget)
- **7.02.c** (Personal Details): `/profile` (Profile Page)
- **7.05.a** (Password Management): `/profile` (Profile Page)
