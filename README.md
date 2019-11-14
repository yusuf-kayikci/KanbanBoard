# Description

Kanban board that you can see your tasks and change their status with perfect and easy property drag-drop

## Installation

For react application run below command in kanbanboardui folder.

```bash
npm install
```
Maven will install automatically all dependencies for backend in kanbanboard folder.

## Endpoints

|  | POST Request |
|--|--|
| URL | http://localhost:8080/api/v1/tasks|
| Method | POST|
| Body |{"title":"New Task", "completeDate":"" ,"content":"New Content", "dueDate":"2019-11-06","status":"TODO"} |

Status property can be just one of "TODO" , "ONGOING" , "DONE"
When you create a new task from react application status will be "TODO" automatically.


|  | GET Request |
|--|--|
| URL | http://localhost:8080/api/v1/tasks|
| Method | GET |

-----

|  | POST Request |
|--|--|
| URL | http://localhost:8080/api/v1/tasks|
| Method | POST|
| Body |{"title":"New Task", "completeDate":"" ,"content":"New Content", "dueDate":"2019-11-06","status":"TODO"} |

----

|  | PUT Request |
|--|--|
| URL | http://localhost:8080/api/v1/tasks/{id}|
| Method | PUT|
| Body |{"title":"New Task", "completeDate":"" ,"content":"Updated content", "dueDate":"2019-11-06","status":"TODO"} |

---


|  | DELETE Request |
|--|--|
| URL | http://localhost:8080/api/v1/tasks/{id}|
| Method | DELETE |


React application does not fetch this endpoint

---




## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
