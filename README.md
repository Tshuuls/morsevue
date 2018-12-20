# Assignment 2 - Vue app - Automated development process.

Name: Julia Zeckl

Student No.:  20083071

## Overview.

The MorseTrainer gives the user the possibility to learn and improve their morse translating skills with random generated courses and user scoarboards for comperisson and motivation.

## E2E Testing.

Running: morsetable.spec.js...                                                           (1 of 1)


 MorseTable
   ✓ Shows table with headings (13453ms)
   ✓ Shows filters (1847ms)
   ✓ Shows 26 rows in tablebody (734ms)
   test CodeFilter
     ✓ Finds existing code (1110ms)
     ✓ Finds non existing code (1255ms)
   test LetterFilter
     ✓ Finds existing code (901ms)
     ✓ Finds non existing code (944ms)


 7 passing (21s)


 (Results)

 ┌──────────────────────────────────┐
 │ Tests:        7                  │
 │ Passing:      7                  │
 │ Failing:      0                  │
 │ Pending:      0                  │
 │ Skipped:      0                  │
 │ Screenshots:  0                  │
 │ Video:        true               │
 │ Duration:     20 seconds         │
 │ Spec Ran:     morsetable.spec.js │
 └──────────────────────────────────┘


 (Video)

 - Started processing:   Compressing to 32 CRF
 - Finished processing:  /Users/julia/Desktop/NextCloud/WebApp/Client/morsevue-1_0/cypress/videos/morsetable.spec.js.mp4 (4 seconds)



## Continuous Integration.

https://travis-ci.com/Tshuuls/morsevue

## Automated Deployment.

The app should be deployed at https://morsevue.herokuapp.com however even tough the build is successful it doesnt work.
...
-----> Build succeeded!
-----> Discovering process types
       Procfile declares types     -> (none)
       Default types for buildpack -> web
-----> Compressing...
       Done: 40.3M
-----> Launching...
       Released v4
       https://morsevue.herokuapp.com/ deployed to Heroku

## Extra features.

-

## Appendix.

Julias-MacBook-Pro-2:morsevue-1_0 julia$ npx cypress run

====================================================================================================

  (Run Starting)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Cypress:    3.1.2                                                                              │
  │ Browser:    Electron 59 (headless)                                                             │
  │ Specs:      4 found (home-page.spec.js, login.spec.js, morsetable.spec.js, scoreboard.spec.js) │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


────────────────────────────────────────────────────────────────────────────────────────────────────

  Running: home-page.spec.js...                                                            (1 of 4)


  Home page
    ✓ Shows main title (3298ms)
    Navigation bar
      ✓ Shows the required links (1682ms)
      ✓ Redirects when links are clicked (668ms)


  3 passing (6s)


  (Results)

  ┌─────────────────────────────────┐
  │ Tests:        3                 │
  │ Passing:      3                 │
  │ Failing:      0                 │
  │ Pending:      0                 │
  │ Skipped:      0                 │
  │ Screenshots:  0                 │
  │ Video:        true              │
  │ Duration:     5 seconds         │
  │ Spec Ran:     home-page.spec.js │
  └─────────────────────────────────┘


  (Video)

  - Started processing:   Compressing to 32 CRF
  - Finished processing:  /Users/julia/Desktop/NextCloud/WebApp/Client/morsevue-1_0/cypress/videos/home-page.spec.js.mp4 (1 second)


────────────────────────────────────────────────────────────────────────────────────────────────────

  Running: login.spec.js...                                                                (2 of 4)


  Login Form
    ✓ Shows  Form  (5303ms)
    Fill in form
      ✓ properly (2915ms)


  2 passing (8s)


  (Results)

  ┌─────────────────────────────┐
  │ Tests:        2             │
  │ Passing:      2             │
  │ Failing:      0             │
  │ Pending:      0             │
  │ Skipped:      0             │
  │ Screenshots:  0             │
  │ Video:        true          │
  │ Duration:     8 seconds     │
  │ Spec Ran:     login.spec.js │
  └─────────────────────────────┘


  (Video)

  - Started processing:   Compressing to 32 CRF
  - Finished processing:  /Users/julia/Desktop/NextCloud/WebApp/Client/morsevue-1_0/cypress/videos/login.spec.js.mp4 (1 second)


────────────────────────────────────────────────────────────────────────────────────────────────────

  Running: morsetable.spec.js...                                                           (3 of 4)


  MorseTable
    ✓ Shows table with headings (5759ms)
    ✓ Shows filters (1767ms)
    ✓ Shows 26 rows in tablebody (738ms)
    test CodeFilter
      ✓ Finds existing code (1137ms)
      ✓ Finds non existing code (1015ms)
    test LetterFilter
      ✓ Finds existing code (997ms)
      ✓ Finds non existing code (860ms)


  7 passing (13s)


  (Results)

  ┌──────────────────────────────────┐
  │ Tests:        7                  │
  │ Passing:      7                  │
  │ Failing:      0                  │
  │ Pending:      0                  │
  │ Skipped:      0                  │
  │ Screenshots:  0                  │
  │ Video:        true               │
  │ Duration:     12 seconds         │
  │ Spec Ran:     morsetable.spec.js │
  └──────────────────────────────────┘


  (Video)

  - Started processing:   Compressing to 32 CRF
  - Finished processing:  /Users/julia/Desktop/NextCloud/WebApp/Client/morsevue-1_0/cypress/videos/morsetable.spec.js.mp4 (2 seconds)


────────────────────────────────────────────────────────────────────────────────────────────────────

  Running: scoreboard.spec.js...                                                           (4 of 4)


  Scoreboard
    ✓ Shows table with headings (11882ms)
    ✓ Shows filters (1854ms)
    ✓ combining filters (1140ms)
    test FirstNameFilter
      1) Finds existing Name
      ✓ Finds non existing name (1031ms)
    test LastNamefilter
      ✓ Finds existing name (1343ms)
      ✓ Finds non existing name (752ms)


  6 passing (23s)
  1 failing

  1) Scoreboard test FirstNameFilter Finds existing Name:
     CypressError: Timed out retrying: Too many elements found. Found '4', expected '2'.
      at Object.cypressErr (http://localhost:8080/__cypress/runner/cypress_runner.js:63008:11)
      at Object.throwErr (http://localhost:8080/__cypress/runner/cypress_runner.js:62973:18)
      at Object.throwErrByPath (http://localhost:8080/__cypress/runner/cypress_runner.js:63000:17)
      at retry (http://localhost:8080/__cypress/runner/cypress_runner.js:56611:16)
      at http://localhost:8080/__cypress/runner/cypress_runner.js:48721:18
      at tryCatcher (http://localhost:8080/__cypress/runner/cypress_runner.js:124249:23)
      at Promise._settlePromiseFromHandler (http://localhost:8080/__cypress/runner/cypress_runner.js:122267:31)
      at Promise._settlePromise (http://localhost:8080/__cypress/runner/cypress_runner.js:122324:18)
      at Promise._settlePromise0 (http://localhost:8080/__cypress/runner/cypress_runner.js:122369:10)
      at Promise._settlePromises (http://localhost:8080/__cypress/runner/cypress_runner.js:122444:18)
      at Async._drainQueue (http://localhost:8080/__cypress/runner/cypress_runner.js:119173:16)
      at Async._drainQueues (http://localhost:8080/__cypress/runner/cypress_runner.js:119183:10)
      at Async.drainQueues (http://localhost:8080/__cypress/runner/cypress_runner.js:119057:14)
      at <anonymous>




  (Results)

  ┌──────────────────────────────────┐
  │ Tests:        7                  │
  │ Passing:      6                  │
  │ Failing:      1                  │
  │ Pending:      0                  │
  │ Skipped:      0                  │
  │ Screenshots:  1                  │
  │ Video:        true               │
  │ Duration:     23 seconds         │
  │ Spec Ran:     scoreboard.spec.js │
  └──────────────────────────────────┘


  (Screenshots)

  - /Users/julia/Desktop/NextCloud/WebApp/Client/morsevue-1_0/cypress/screenshots/scoreboard.spec.js/Scoreboard -- test FirstNameFilter -- Finds existing Name (failed).png (1280x720)


  (Video)

  - Started processing:   Compressing to 32 CRF
  - Finished processing:  /Users/julia/Desktop/NextCloud/WebApp/Client/morsevue-1_0/cypress/videos/scoreboard.spec.js.mp4 (4 seconds)


====================================================================================================

  (Run Finished)


      Spec                                                Tests  Passing  Failing  Pending  Skipped
  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ ✔ home-page.spec.js                         00:05        3        3        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ ✔ login.spec.js                             00:08        2        2        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ ✔ morsetable.spec.js                        00:12        7        7        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ ✖ scoreboard.spec.js                        00:23        7        6        1        -        - │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘
    1 of 4 failed (25%)                         00:49       19       18        1        -        -
