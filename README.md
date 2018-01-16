
# [Property Listing](http:/proplisting.wahibhanii.xyz)

An online property advertising app  
[proplisting.wahibhanii.xyz](http:/proplisting.wahibhanii.xyz)
____________________
## App Usage 

### Page
  - regular signup using email
  - regular login 
  - Add new advertisement
  - Edit advertisement
  - Browse: Browse all advertisement, with search feature
  - My Profile: shows user email, followed users and followers
## Feature
  - __Post New Advertisement__: Post new advertisement.
    - Can add location by picking coordinate on map
    - __can upload multiple photos__
  - __Ad's detail__: 
    - see detailed info of an advertisement
    - location shown in a map
    - you can also edit ad
  - __LIVE SEARCH__: 
    - you can search ads by typing onto the search field
    - this will search through address or Ad title everytime you hit the keyboard

-------
# PROPLISTING API
## Users API
### List of Users API endpoint:
| Route                       | HTTP   | Description                         | 
| -------------------------   |:------ | ----------------------------------- |
| `/users/login`              | POST   | Regular Login, returns access token |
| `/users/`                   | GET    | Find All users                      |
| `/users/id`                 | GET    | Find one user by ID                 |
| `/users/`                   | POST   | Create new User / Signup            |
| `/users/:id`                | DELETE | Delete User                         |
| `/users/:id/`               | PUT    | Edit user                           |

### Endpoint Usage
- POST : `/users/login`
  - req.body.email: should contain user's email
  - req.body.password: should contain user's password
- GET : `/users/`
- GET : `/users/:id` 
- POST : `/users/`
  - req.body.email: should contain user's email
  - req.body.userName: should contain user's username
  - req.body.password: should contain user's password
- DELETE : `/users/:id`  
- PUT : `/users/:id/`
  - req.body.update: should contain updated filed and it's value (write in stringified JSON)

## Props API
### List of Posts API endpoint:
| Route              | HTTP   | Description                  | 
| ------------------ |:------ | ---------------------------  |
| `/props/`          | GET    | Get all ads                  |
| `/props/search`    | GET    | get all ads by search query  |
| `/props/:id`       | GET    | get all ad detail by ID      |
| `/props/`          | POST   | Create advertisement         |
| `/props/:id`       | DELETE | Delete an ad                 |
| `/props/:id`       | PUT    | Edit a post                  |

### Endpoint Usage
- GET : `/props/`
- GET : `/props/search`
  - req.headers.token: contain token from login
  - req.queary.field: contain search query
- GET : `/props/:id`
  - req.headers.token: contain token from login
  - req.params.id: target user's ID
- POST : `/props/` 
  - req.headers.token: contain token from login
  - req.body.detailProp: contain property info
  - req.files: contain photos/images for advertisement
- DELETE : `/props/:id`  
  - req.headers.token: contain token from login
- PUT : `/props/:id/`
  - req.headers.token: contain token from login
  - req.body.update: should contain updated field and it's value (write in stringified JSON)


Access the website via [proplisting.wahibhanii.xyz](http:/proplisting.wahibhanii.xyz) or API via `http://35.185.113.211`
