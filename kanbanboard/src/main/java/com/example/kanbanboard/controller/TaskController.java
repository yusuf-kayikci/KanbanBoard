package com.example.kanbanboard.controller;

import com.example.kanbanboard.exception.ResourceNotFoundException;
import com.example.kanbanboard.model.Task;
import com.example.kanbanboard.repository.TaskRepository;

import jdk.management.resource.ResourceRequestDeniedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class TaskController {
    @Autowired
    private TaskRepository _taskRepository;
    @Autowired
    public TaskController()
    {

    }

    @RequestMapping(value = "/test" , method = RequestMethod.GET)
    public String Test(){
        return "Test";
    }

    @RequestMapping(value = "/tasks" , method = RequestMethod.GET)
    public List<Task> GetAll(){
        return _taskRepository.findAll();
    }

    @RequestMapping(value = "/task/{id}" , method = RequestMethod.GET)
    public ResponseEntity< Task > GetTaskById(@PathVariable(value = "id") Long taskId)
            throws ResourceNotFoundException {
        Task task = _taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found for this id :: " + taskId));
        return new ResponseEntity<Task>(task, HttpStatus.OK);
    }
    @RequestMapping(value = "/task" , method = RequestMethod.POST)
    public ResponseEntity<Task> AddNewTask(@Valid @RequestBody Task newTask)
    {
        Task task = _taskRepository.save(newTask);
        return new ResponseEntity<Task>(task , HttpStatus.OK);
    }


    @RequestMapping(value = "/task/{id}" , method = RequestMethod.PUT)
    public ResponseEntity < Task > UpdateTask(@PathVariable(value = "id") Long taskId, @Valid @RequestBody Task updatedTask)
            throws ResourceNotFoundException {
        Task task = _taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found for this id :: " + taskId));
        task.setStatus(updatedTask.getStatus());
        final  Task savedTask = _taskRepository.save(task);
        return new ResponseEntity<Task>(savedTask, HttpStatus.OK);
    }

    @RequestMapping(value = "/task/{id}" , method = RequestMethod.DELETE)
    public ResponseEntity<Task> DeleteTask(@PathVariable(value = "id") Long taskId)
            throws ResourceNotFoundException {
        Task task = _taskRepository.findById(taskId).orElseThrow(() -> new ResourceRequestDeniedException("Task not found for this id :: " + taskId));
        _taskRepository.delete(task);
        return new ResponseEntity<Task>(task ,HttpStatus.OK );
    }


}
