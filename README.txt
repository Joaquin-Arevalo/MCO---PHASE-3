There are two ways to run the project locally and online. 

Local:
To run the project locally the user must have installed node js. If not yet installed the user may download it here from the website
(node js download link: https://nodejs.org/en/). After, the user needs input 'cmd' in the folder where the files are located to open the
command prompt. Then, the user needs to input 'npm install' to download the necessary packages utilized in the project if gitignore
is present. Next, the user needs to input 'node index.js', this will result into the command prompt printing out the link needed to access
the website/project. If you are having difficulties locating the link simply input this on the web browser 'http://localhost:3000'. Moreover,
inputting the link on a web browser would open the website.

Online: 
To run the project online or to access it simply input the link 'to be replace with the actual link' on the web browser.

Database:
To access the database, the user may use monggodb compass and input the following connecion string without the apostrophe
'Connected to: mongodb+srv://admin:ccapdev-readit-project0027@cluster0.ut1s2tm.mongodb.net/'. This would display the model schema for account, 
post, comment, reports, report_comments, and w_ls.

GitHub Repository Link: https://github.com/Joaquin-Arevalo/MCO---PHASE-3.git

Functions:
Once the user has open the website he/she has the following initial options:
    >Register   - The user may opt to register an account if he/she does not have one yet, this contains the fields the username, password, and 
                  confirm password.
    >Login      - The user may login an account to access further website functions, this contains the fields for the username and password.
    >View Post  - View the post and comments made in the website, W & Ls is also visible here but not yet interactible.
    >Search     - The user may use the search bar to search for a specific or similar post and/or comment text in the website.

Once the user has login he/she now has the following additional options:
    >Profile        - The user may view his/her profile. This would display the user's bio, profile picture, three latest post and comments.
    >Edit Profile   - The user may edit his/her profile regarding the bio and profile picture.
    >Delete Profile - The user has the option to delete his/her profile from the website, which would also be deleted from the database.
    >Create Post    - The user may also create a post containing the fields category, title, body, and image (optional).
    >View Post      - The user may view the post and comments made in the website, the user will also have the following options in the view post:
                      comment, delete and edit post and comment if made by the user, W & L, and report on other's post and comment (more on this below).
    >Edit Post      - The user may edit a post made by him/her, same elements as the create post with only updating the existing post.
    >Delete Post    - The user may delete a post made by him/her.
    >Report Post    - The user may report a post only made by others.
    >Create Comment - The user may comment on any post, this only contains fields for the text.
    >Edit Comment   - The user may edit a comment made by him/her, same elements for the create comment.
    >Report Comment - The user may report a comment only made by others.

Admin account - The admin has three additional options available:
    >Admin Page     - The admin may view the post and comments that were reported.
    >Delete Post    - The admin has the option to delete a post made by anyone that has been reported.
    >Delete Comment - The admin has the option to delete a comment made by anyone that has been reported.

Additional information:
    >Filter             - Any post and comment created and edited will be checked for profanities, racial and/or ethnic slurs that will be changed, 
                          for example shit will become ****.
    >Admin Registration - The admin can only be created by first making an account, then accessing the database account collection wherein the 
                          account_type must be manually changed to 'Admin'.
    >Password Hashing   - The password is hashed in the database account collection. Therefore, owners do not have the option to login to other accounts.