# Comprehensive Test Plan for Hotel Booking Platform

## Introduction

This test plan provides structured test cases for three key user stories on a hotel booking platform:
1. Hotel Search & Filtering
2. Flight/Car Booking Process
3. Hotel Details & Amenities Verification

Each test case includes priority, automation recommendation, steps, and expected results following a consistent format.

## Test Case Format

```
### [Test ID] - [Description]

- **Priority:** [High/Medium/Low]
- **Automate:** [Yes/No]
- **User Story:** [US-1/US-2/US-3]
- **Preconditions:** [What must be true before test execution]
- **Steps:**
  1. [Step 1]
  2. [Step 2]
  3. ...
- **Expected Results:**
  - [Expected outcome 1]
  - [Expected outcome 2]
  - ...
```

## User Story 1: Hotel Search & Filtering

### Basic Search Functionality

### TC-S-001 - Verify searching for hotels in "New York" displays relevant results

- **Priority:** High
- **Automate:** Yes
- **User Story:** US-1
- **Preconditions:** User is on the hotel search page
- **Steps:**
  1. Enter "New York" in the city search field
  2. Click search button
- **Expected Results:**
  - Relevant hotel results for New York are displayed
  - Result count is greater than zero
  - Each hotel result shows location in New York

### TC-S-002 - Verify search works with city name variations

- **Priority:** Medium
- **Automate:** No
- **Preconditions:** User is on the hotel search page
- **Steps:**
  1. Search for "NYC"
  2. Search for "New York City"
  3. Search for "NY, USA"
- **Expected Results:**
  - All variations return New York hotels

### TC-S-003 - Verify search is case insensitive

- **Priority:** Medium
- **Automate:** No
- **Preconditions:** User is on the hotel search page
- **Steps:**
  1. Search for "new york"
  2. Search for "NEW YORK"
  3. Search for "New York"
- **Expected Results:**
  - All searches return identical results

### TC-S-004 - Verify search handles special characters and Unicode

- **Priority:** Medium
- **Automate:** No
- **Preconditions:** User is on the hotel search page
- **Steps:**
  1. Search for "Zürich"
  2. Search for "São Paulo"
  3. Search for "München"
- **Expected Results:**
  - Correct results for each city with special characters

### Date Selection Functionality

### TC-D-001 - Verify selecting check-in and check-out dates updates availability

- **Priority:** High
- **Automate:** Yes
- **User Story:** US-1
- **Preconditions:** User has performed a city search
- **Steps:**
  1. Select tomorrow as check-in date
  2. Select 3 days later as check-out date
- **Expected Results:**
  - Available hotels for selected date range are displayed
  - Price shown matches the selected dates

### TC-D-002 - Verify system prevents invalid date selections

- **Priority:** High
- **Automate:** No
- **Preconditions:** User has performed a city search
- **Steps:**
  1. Try to select a past date for check-in
  2. Try to select check-out date earlier than check-in date
- **Expected Results:**
  - Past dates are disabled/unselectable
  - Warning message if attempting invalid selection
  - System prevents completion with invalid dates

### TC-D-003 - Verify system handles long-duration stays

- **Priority:** Medium
- **Automate:** No
- **Preconditions:** User has performed a city search
- **Steps:**
  1. Select check-in date (today + 30 days)
  2. Select check-out date (today + 60 days)
- **Expected Results:**
  - System accepts 30-day stay
  - Results show accurately for extended stay
  - Price calculation correct for long duration

### Filter Functionality

### TC-F-001 - Verify applying "Guest Rating: 8+" filter updates results correctly

- **Priority:** High
- **Automate:** Yes
- **User Story:** US-1
- **Preconditions:** User has performed a city search
- **Steps:**
  1. Apply "Guest Rating: 8+" filter
  2. Review filtered results
- **Expected Results:**
  - Only hotels with 8+ rating are displayed
  - Filter is visibly active/selected
  - Result count updates to reflect filtered hotels

### TC-F-002 - Verify multiple filters work together correctly

- **Priority:** High
- **Automate:** No
- **Preconditions:** User has performed a city search
- **Steps:**
  1. Apply "Guest Rating: 8+" filter
  2. Apply "Price: $100-$200" filter
  3. Apply "Amenities: Pool" filter
- **Expected Results:**
  - Results match all filter criteria simultaneously
  - All applied filters shown as active
  - Results count reflects combined filtering

### TC-F-003 - Verify appropriate message when filters return no results

- **Priority:** High
- **Automate:** No
- **Preconditions:** User has performed a city search
- **Steps:**
  1. Apply restrictive combination of filters (e.g., 5-star, under $50, beachfront in NYC)
- **Expected Results:**
  - "No hotels match your criteria" message
  - Suggestion to modify filters
  - Option to clear all filters

### Sorting Functionality

### TC-SO-001 - Verify sorting by "Lowest Price" reorders results as expected

- **Priority:** High
- **Automate:** Yes
- **User Story:** US-1
- **Preconditions:** User has performed a city search
- **Steps:**
  1. Select "Sort by: Lowest Price" option
  2. Review sorted results
- **Expected Results:**
  - Hotels displayed in ascending price order
  - Lowest price hotel appears first
  - Prices consistently increase down the list

### TC-SO-002 - Verify "Highest Price" sorting works correctly

- **Priority:** Medium
- **Automate:** No
- **Preconditions:** User has performed a city search
- **Steps:**
  1. Select "Sort by: Highest Price" option
  2. Review sorted results
- **Expected Results:**
  - Hotels displayed in descending price order
  - Highest price hotel appears first
  - Prices consistently decrease down the list

### TC-SO-003 - Verify "Guest Rating" sorting works correctly

- **Priority:** Medium
- **Automate:** No
- **Preconditions:** User has performed a city search
- **Steps:**
  1. Select "Sort by: Guest Rating" option
  2. Review sorted results
- **Expected Results:**
  - Hotels displayed in descending rating order
  - Highest rated hotel appears first
  - Ratings consistently decrease down the list

## User Story 2: Flight/Car Booking Process

### Flight Booking Tests

### TC-FB-001 - Verify searching for round-trip flight enables return date selection

- **Priority:** High
- **Automate:** Yes
- **User Story:** US-2
- **Preconditions:** User is on the flight search page
- **Steps:**
  1. Select "Round-trip" option
  2. Observe date selection fields
- **Expected Results:**
  - Return date field is enabled and selectable
  - Calendar for return date is accessible

### TC-FB-002 - Verify selecting departure & destination displays available flights

- **Priority:** High
- **Automate:** Yes
- **User Story:** US-2
- **Preconditions:** User is on the flight search page
- **Steps:**
  1. Enter "New York" as departure city
  2. Enter "London" as destination city
  3. Select valid travel dates
  4. Click search button
- **Expected Results:**
  - Available flights between New York and London are displayed
  - Each flight shows departure/arrival times and price
  - Results count is greater than zero

### TC-FB-003 - Verify invalid date range triggers error message

- **Priority:** High
- **Automate:** Yes
- **User Story:** US-2
- **Preconditions:** User is on the flight search page
- **Steps:**
  1. Select "Round-trip" option
  2. Enter valid departure date
  3. Attempt to search
- **Expected Results:**
  - Error message indicates invalid date selection
  - System prevents search with invalid dates
  - Suggests correction to date selection

### TC-FB-004 - Verify proceeding to checkout displays booking summary

- **Priority:** High
- **Automate:** Yes
- **User Story:** US-2
- **Preconditions:** User has searched for and selected a flight
- **Steps:**
  1. Select a flight from search results
  2. Click "Continue" or "Book" button
  3. Review checkout/booking page
- **Expected Results:**
  - Booking summary shows selected flight details
  - Price breakdown is displayed
  - Passenger information form is available
  - Payment options are presented

### Alternative: Car Rental Booking Tests

### TC-CR-001 - Verify car rental search form allows location selection

- **Priority:** High
- **Automate:** Yes
- **User Story:** US-2
- **Preconditions:** User is on the car rental search page
- **Steps:**
  1. Enter "Miami" in the pick-up location field
  2. Observe suggestions and select the airport location
- **Expected Results:**
  - Location suggestions appear as user types
  - Airport and city center options are available
  - Selected location is displayed in the form field

### TC-CR-002 - Verify date and time selection for car rental

- **Priority:** High
- **Automate:** Yes
- **User Story:** US-2
- **Preconditions:** User is on the car rental search page
- **Steps:**
  1. Select pick-up date (tomorrow)
  2. Select pick-up time (10:00 AM)
  3. Select drop-off date (tomorrow + 3 days)
  4. Select drop-off time (4:00 PM)
- **Expected Results:**
  - All date and time fields accept input
  - Calendar interface works properly
  - Time selection functions correctly
  - Selected values display in form fields

### TC-CR-003 - Verify car search results display relevant information

- **Priority:** High
- **Automate:** Yes
- **User Story:** US-2
- **Preconditions:** User has entered search criteria for car rental
- **Steps:**
  1. Enter valid location, dates, and times
  2. Click search button
  3. Review search results
- **Expected Results:**
  - Available car options are displayed
  - Each listing shows car type, price, and rental company
  - Images of representative vehicles are shown
  - Key features (AC, automatic/manual, etc.) are indicated

### TC-CR-004 - Verify proceeding to car rental checkout displays booking summary

- **Priority:** High
- **Automate:** Yes
- **User Story:** US-2
- **Preconditions:** User has searched for and selected a car rental
- **Steps:**
  1. Select a car from search results
  2. Click "Continue" or "Book" button
  3. Review checkout/booking page
- **Expected Results:**
  - Booking summary shows selected car details
  - Rental period and location information displayed
  - Price breakdown including any fees is shown
  - Driver information form is available
  - Payment options are presented

## User Story 3: Hotel Details & Amenities Verification

### TC-HD-001 - Verify hotel listing navigation to details page

- **Priority:** High
- **Automate:** Yes
- **User Story:** US-3
- **Preconditions:** User has performed a hotel search with results
- **Steps:**
  1. Click on a hotel listing from search results
- **Expected Results:**
  - User is navigated to the hotel details page
  - URL changes to reflect specific hotel
  - Page loads within reasonable time (< 3 seconds)

### TC-HD-002 - Verify hotel details page displays essential information

- **Priority:** High
- **Automate:** Yes
- **User Story:** US-3
- **Preconditions:** User is on a hotel details page
- **Steps:**
  1. Review the information on the page
- **Expected Results:**
  - Hotel name is clearly displayed
  - Location/address is visible
  - Star rating is shown
  - Price information is present
  - Brief description is available

### TC-HD-003 - Verify photo gallery functionality for hotel images

- **Priority:** High
- **Automate:** Yes
- **User Story:** US-3
- **Preconditions:** User is on a hotel details page
- **Steps:**
  1. Locate the photo gallery
  2. Click to view the first photo
  3. Navigate through multiple photos using next/previous controls
  4. Click to exit/close the gallery
- **Expected Results:**
  - Gallery is present with thumbnail images
  - Full-size photos display when clicked
  - Navigation controls work properly
  - Gallery can be closed/exited
  - Image loading is responsive

### TC-HD-004 - Verify hotel amenities list is visible

- **Priority:** High
- **Automate:** Yes
- **User Story:** US-3
- **Preconditions:** User is on a hotel details page
- **Steps:**
  1. Locate the amenities section
  2. Review list of amenities
- **Expected Results:**
  - Amenities section is clearly labeled
  - Common amenities (Wi-Fi, parking, etc.) are listed
  - Icons or visual indicators accompany amenities
  - Categorization of amenities if applicable (e.g., room amenities vs. property amenities)

### TC-HD-005 - Verify user reviews and ratings are displayed

- **Priority:** High
- **Automate:** Yes
- **User Story:** US-3
- **Preconditions:** User is on a hotel details page
- **Steps:**
  1. Locate the reviews section
  2. Review overall rating and individual reviews
- **Expected Results:**
  - Overall rating score is prominently displayed
  - Number of reviews is indicated
  - Individual review snippets or full reviews are visible
  - Rating breakdown by categories (cleanliness, service, etc.) if available
  - Option to read more reviews or sort reviews

### TC-HD-006 - Verify map showing hotel location is present

- **Priority:** Medium
- **Automate:** Yes
- **User Story:** US-3
- **Preconditions:** User is on a hotel details page
- **Steps:**
  1. Locate the map section
  2. Interact with the map (if interactive)
- **Expected Results:**
  - Map showing hotel location is displayed
  - Hotel is marked/pinned on the map
  - Map is interactive (can zoom/pan) if applicable
  - Nearby landmarks or points of interest may be shown
  - Option to view larger map or get directions

### TC-HD-007 - Verify room selection functionality

- **Priority:** High
- **Automate:** No
- **Preconditions:** User is on a hotel details page
- **Steps:**
  1. Locate room options section
  2. Review different room types
  3. Select a room type
- **Expected Results:**
  - Multiple room types are displayed (if available)
  - Each room shows price, capacity, and brief description
  - Room amenities are listed
  - Selection mechanism works correctly
  - Price updates based on previously selected dates

### TC-HD-008 - Verify booking availability on the hotel details page

- **Priority:** High
- **Automate:** No
- **Preconditions:** User is on a hotel details page
- **Steps:**
  1. Locate booking section on the page
  2. Verify date selection option
  3. Select dates for a stay
- **Expected Results:**
  - Booking widget or section is prominently displayed
  - Date selection is functional
  - Price updates based on selected dates
  - "Book Now" or equivalent button is visible
  - Room availability is indicated

## Test Automation Priority Summary

### User Story 1: Hotel Search & Filtering
1. **TC-S-001** - Verify searching for hotels in "New York" displays relevant results
2. **TC-D-001** - Verify selecting check-in and check-out dates updates availability
3. **TC-F-001** - Verify applying "Guest Rating: 8+" filter updates results correctly
4. **TC-SO-001** - Verify sorting by "Lowest Price" reorders results as expected

### User Story 2: Flight/Car Booking Process
5. **TC-FB-001** - Verify searching for round-trip flight enables return date selection
6. **TC-FB-002** - Verify selecting departure & destination displays available flights
7. **TC-FB-003** - Verify invalid date range triggers error message
8. **TC-FB-004** - Verify proceeding to checkout displays booking summary

**Alternative (Car Rental)**
5. **TC-CR-001** - Verify car rental search form allows location selection
6. **TC-CR-002** - Verify date and time selection for car rental
7. **TC-CR-003** - Verify car search results display relevant information
8. **TC-CR-004** - Verify proceeding to car rental checkout displays booking summary

### User Story 3: Hotel Details & Amenities Verification
9. **TC-HD-001** - Verify hotel listing navigation to details page
10. **TC-HD-002** - Verify hotel details page displays essential information
11. **TC-HD-003** - Verify photo gallery functionality for hotel images
12. **TC-HD-004** - Verify hotel amenities list is visible
13. **TC-HD-005** - Verify user reviews and ratings are displayed
14. **TC-HD-006** - Verify map showing hotel location is present
