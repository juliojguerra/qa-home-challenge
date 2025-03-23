# Hotel Search & Filtering Test Cases

## Summary

The test cases presented in this document were created with AI assistance, specifically using Claude 3.7 Sonnet. The AI helped generate comprehensive test scenarios covering three key user stories: Hotel Search & Filtering, Flight Booking Process, and Hotel Details & Amenities Verification. Claude 3.7 Sonnet provided structured test cases with detailed steps, expected results, and clear organization by functionality. The AI tool was particularly helpful in identifying edge cases, suggesting logical test flows, and ensuring consistent formatting across all test cases. This collaborative approach allowed for rapid development of a thorough test plan that focuses automation efforts on key scenarios while maintaining complete coverage of all features.

## Test Case Format

Each test case follows this format:

```markdown
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

## User Story to Test Case Mapping

### User Story 1: Hotel Search & Filtering

- **Key Test Scenarios:**
  - TC-S-001 - Verify searching for hotels in "New York" displays relevant results
  - TC-D-001 - Verify selecting check-in and check-out dates updates availability
  - TC-F-001 - Verify applying "Guest Rating: 8+" filter updates results correctly
  - TC-SO-001 - Verify sorting by "Lowest Price" reorders results as expected
- **Additional Tests:**
  - TC-S-002 through TC-S-004 (Additional Search Tests)
  - TC-D-002 through TC-D-005 (Additional Date Selection Tests)
  - TC-F-002 through TC-F-005 (Additional Filter Tests)
  - TC-SO-002 through TC-SO-005 (Additional Sorting Tests)
  - TC-P-001 through TC-P-005 (Performance & Edge Cases)
  - TC-A-001 through TC-A-003 (Accessibility & Usability)

### User Story 2: Flight Booking Process

- **Key Test Scenarios:**
  - TC-FB-001 - Verify searching for round-trip flight enables return date selection
  - TC-FB-002 - Verify selecting departure & destination displays available flights
  - TC-FB-003 - Verify invalid date range triggers error message
  - TC-FB-004 - Verify proceeding to checkout displays booking summary
- **Additional Tests:**
  - TC-FB-005 through TC-FB-006 (Additional Flight Booking Tests)

### User Story 3: Hotel Details & Amenities Verification

- **Key Test Scenarios:**
  - TC-HD-001 - Verify hotel listing navigation to details page
  - TC-HD-002 - Verify hotel details page displays essential information
  - TC-HD-003 - Verify photo gallery functionality for hotel images
  - TC-HD-004 - Verify hotel amenities list is visible
  - TC-HD-005 - Verify user reviews and ratings are displayed
  - TC-HD-006 - Verify map showing hotel location is present
- **Additional Tests:**
  - TC-HD-007 through TC-HD-008 (Additional Hotel Details Tests)

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

### TC-D-004 - Verify system response to same-day selection

- **Priority:** Medium
- **Automate:** No
- **Preconditions:** User has performed a city search
- **Steps:**
  1. Select today as check-in date
  2. Try to select today as check-out date
- **Expected Results:**
  - System prevents same-day check-in/check-out
  - Error message explaining minimum stay

### TC-D-005 - Verify date selection at calendar boundaries

- **Priority:** Low
- **Automate:** No
- **Preconditions:** User has performed a city search
- **Steps:**
  1. Select date range spanning month end (e.g., Apr 29 - May 3)
  2. Select date range spanning year end (e.g., Dec 29 - Jan 3)
- **Expected Results:**
  - Calendar navigation works correctly
  - Results display properly for cross-boundary dates

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

### TC-F-004 - Verify removing filters updates results correctly

- **Priority:** Medium
- **Automate:** No
- **Preconditions:** User has applied multiple filters
- **Steps:**
  1. Remove one filter by clicking its X/remove button
  2. Click "Clear all filters" button
- **Expected Results:**
  - Removing one filter updates results immediately
  - Clear all resets to unfiltered city search results
  - Filter UI shows correct active/inactive state

### TC-F-005 - Verify filters persist through page navigation

- **Priority:** Medium
- **Automate:** No
- **Preconditions:** User has applied filters to search results
- **Steps:**
  1. Apply several filters
  2. Click on a hotel to view details
  3. Return to search results
- **Expected Results:**
  - All previously applied filters remain active
  - Results maintain previous filtering

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

### TC-SO-004 - Verify sorting works correctly with active filters

- **Priority:** Medium
- **Automate:** No
- **Preconditions:** User has applied filters to search results
- **Steps:**
  1. Apply "Amenities: Pool" filter
  2. Sort filtered results by "Lowest Price"
- **Expected Results:**
  - Only hotels with pools are displayed
  - These hotels are sorted by ascending price
  - Both filter and sort are visibly active

### TC-SO-005 - Verify ties in sorting criteria handled properly

- **Priority:** Low
- **Automate:** No
- **Preconditions:** User has performed a city search
- **Steps:**
  1. Sort by "Guest Rating"
  2. Check hotels with identical ratings
- **Expected Results:**
  - Hotels with identical ratings grouped together
  - Secondary sort criterion applied (e.g., popularity)

### Performance & Edge Cases

### TC-P-001 - Verify system handles large result sets properly

- **Priority:** High
- **Automate:** No
- **Preconditions:** User is on the hotel search page
- **Steps:**
  1. Search for populous city (e.g., "London" or "Tokyo")
  2. Review results loading and display
- **Expected Results:**
  - Results load in reasonable time (< 3 seconds)
  - Pagination or infinite scroll works properly
  - UI remains responsive with large dataset

### TC-P-002 - Verify system handles no available hotels edge case

- **Priority:** High
- **Automate:** No
- **Preconditions:** User is on the hotel search page
- **Steps:**
  1. Search for valid but obscure location (e.g., "Ittoqqortoormiit, Greenland")
  2. Set dates during known local busy period
- **Expected Results:**
  - "No hotels available" message displayed
  - Suggestion to try different dates or location
  - No system errors or blank screens

### TC-P-003 - Verify system response to connection loss during search

- **Priority:** Medium
- **Automate:** No
- **Preconditions:** User is on the hotel search page
- **Steps:**
  1. Initiate search for hotels
  2. Simulate connection loss during search
- **Expected Results:**
  - Error message about connection issue
  - Option to retry search
  - Graceful handling without system crash

### TC-P-004 - Verify search with only city (no dates/filters)

- **Priority:** Medium
- **Automate:** No
- **Preconditions:** User is on the hotel search page
- **Steps:**
  1. Enter only city name "New York"
  2. Leave all other fields at defaults
  3. Click search
- **Expected Results:**
  - Results show all available hotels
  - Default date range applied (if any)
  - Clear indication that additional criteria can be added

### TC-P-005 - Verify system handles rapid filter changes

- **Priority:** Low
- **Automate:** No
- **Preconditions:** User has performed a city search
- **Steps:**
  1. Rapidly apply and remove multiple filters in succession
  2. Change sort order during filter updates
- **Expected Results:**
  - System debounces rapid changes appropriately
  - Final state reflects last selected options
  - No UI freezing or inconsistent results

### Accessibility & Usability

### TC-A-001 - Verify search and filters accessible via keyboard

- **Priority:** High
- **Automate:** No
- **Preconditions:** User is on the hotel search page
- **Steps:**
  1. Use Tab key to navigate to search field
  2. Enter city name using keyboard
  3. Tab to filters and activate using keyboard
- **Expected Results:**
  - All functionality accessible via keyboard
  - Focus indicators clearly visible
  - Tab order is logical

### TC-A-002 - Verify screen reader announces search options and results

- **Priority:** High
- **Automate:** No
- **Preconditions:** User is on the hotel search page with screen reader active
- **Steps:**
  1. Navigate through search interface with screen reader
  2. Perform search and review results
- **Expected Results:**
  - All fields and controls properly labeled
  - Results announced with relevant details
  - No unlabeled controls or content

### TC-A-003 - Verify filter state clearly visible to users

- **Priority:** Medium
- **Automate:** No
- **Preconditions:** User has performed a city search
- **Steps:**
  1. Apply multiple filters
  2. Check visual indication of active filters
- **Expected Results:**
  - Active filters clearly highlighted
  - Summary of applied filters visible
  - Method to remove each filter is obvious

## User Story 2: Flight Booking Process

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
  2. Enter departure date (today + 7 days)
  3. Enter return date (today + 3 days) which is before departure
  4. Attempt to search
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

### TC-FB-005 - Verify flight search with multi-city option

- **Priority:** Medium
- **Automate:** No
- **Preconditions:** User is on the flight search page
- **Steps:**
  1. Select "Multi-city" option
  2. Enter details for first leg (e.g., NYC to London)
  3. Enter details for second leg (e.g., London to Paris)
  4. Enter details for third leg (e.g., Paris to NYC)
  5. Search for flights
- **Expected Results:**
  - System displays available options for all flight legs
  - Combined pricing is shown
  - Each leg's details are clearly separated

### TC-FB-006 - Verify flight filters functionality

- **Priority:** Medium
- **Automate:** No
- **Preconditions:** User has performed a flight search
- **Steps:**
  1. Apply filter for direct flights only
  2. Apply filter for specific airline
  3. Apply filter for departure time range
- **Expected Results:**
  - Results update to show only flights meeting all criteria
  - Filters show as active/selected
  - Result count updates to reflect filtered flights

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

### TC-HD-008 - Verify policy information display

- **Priority:** Medium
- **Automate:** No
- **Preconditions:** User is on a hotel details page
- **Steps:**
  1. Locate hotel policies section
  2. Review cancellation policy, check-in/out times, etc.
- **Expected Results:**
  - Cancellation policy is clearly stated
  - Check-in and check-out times are displayed
  - Pet policy is mentioned
  - Age restrictions or children policy is stated
  - Other relevant policies are accessible

## Summary of Test Automation by User Story

### User Story 1: Hotel Search & Filtering (Key Scenarios)

1. **TC-S-001** - Verify searching for hotels in "New York" displays relevant results
2. **TC-D-001** - Verify selecting check-in and check-out dates updates availability
3. **TC-F-001** - Verify applying "Guest Rating: 8+" filter updates results correctly
4. **TC-SO-001** - Verify sorting by "Lowest Price" reorders results as expected

### User Story 2: Flight Booking Process (Key Scenarios)

5. **TC-FB-001** - Verify searching for round-trip flight enables return date selection
6. **TC-FB-002** - Verify selecting departure & destination displays available flights
7. **TC-FB-003** - Verify invalid date range triggers error message
8. **TC-FB-004** - Verify proceeding to checkout displays booking summary

### User Story 3: Hotel Details & Amenities Verification (Key Scenarios)

9. **TC-HD-001** - Verify hotel listing navigation to details page
10. **TC-HD-002** - Verify hotel details page displays essential information
11. **TC-HD-003** - Verify photo gallery functionality for hotel images
12. **TC-HD-004** - Verify hotel amenities list is visible
13. **TC-HD-005** - Verify user reviews and ratings are displayed
14. **TC-HD-006** - Verify map showing hotel location is present

**Total: 14 tests prioritized for automation covering all key scenarios from the user stories**
