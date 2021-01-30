# SoftwareDesignGroup23
Assignment 1

1. Discuss your initial thoughts in details on how you will design this application? (2 points)


(Edward) All 3 of us joined a call together to discuss all details of Assignment 1. We first discussed picking either Bootstrap or React to build the front end; we will soon choose one to learn and use in preparation for Assignment 2. For potential back end, there might be SQL involved. From our perspective, it is a simple series of screens with different options to navigate to other screens (excluding the inner workings of back end / how fuel quote works). Depending on user inputs or options that the user chooses, the screen will change accordingly (EX: input of correct login information will either lead to the Profile Management screen or the Fuel Quote screen). Details of these navigations will be explained by Henderson and in the UML diagram. The result of our discussion is represented in the attached UML diagram that we worked collaboratively on. 

2. Discuss what development methodology you will use and why? (2 points)


3. Provide a high level design / architecture of your solution that you are proposing? (6 points)

(Henderson) The user will be introduced to a login screen in which they’ll be prompted for a username and password. If the user inputs valid information, they’ll be moved to either the Profile Management Screen or Fuel Quote Screen depending on their profile completion status. If the information is invalid, they’ll be given an option to register a username and password. Under the scenario that the user has not completed their profile, they’ll be asked to input their personal information before being brought to the Fuel Quote Screen. The screen will prompt the user to fill out a form that includes how much fuel they will need along with their delivery address. Once the form has been filled out, they’ll be brought to the Quote Result Screen in which they may either view their Quote History or request a new Fuel Quote. Every screen will have a navigation box that allows the user to immediately go to Profile Management or log out of their account.




