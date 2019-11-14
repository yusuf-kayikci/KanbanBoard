package com.example.kanbanboard.controller;

import com.example.kanbanboard.exception.ResourceNotFoundException;
import com.example.kanbanboard.model.KanbanTask;
import com.example.kanbanboard.repository.TaskRepository;
import jdk.management.resource.ResourceRequestDeniedException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class TaskController {
    private final TaskRepository _taskRepository;

    public TaskController(final TaskRepository taskRepository) {
        _taskRepository = taskRepository;
    }


    @RequestMapping(value = "/tasks" , method = RequestMethod.GET)
    public List<KanbanTask> GetAll() {
        return _taskRepository.findAll();
    }

    @RequestMapping(value = "/tasks/{id}" , method = RequestMethod.GET)
    public ResponseEntity<KanbanTask> GetTaskById(@PathVariable(value = "id") Long taskId)
            throws ResourceNotFoundException {
        KanbanTask kanbanTask = _taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found for this id :: " + taskId));
        return new ResponseEntity<>(kanbanTask, HttpStatus.OK);
    }

    @RequestMapping(value = "/tasks" , method = RequestMethod.POST)
    public ResponseEntity<KanbanTask> AddNewTask(@Valid @RequestBody KanbanTask newKanbanTask) {
        KanbanTask kanbanTask = _taskRepository.save(newKanbanTask);
        return new ResponseEntity<>(kanbanTask, HttpStatus.OK);
    }


    @RequestMapping(value = "/tasks/{id}" , method = RequestMethod.PUT)
    public ResponseEntity<KanbanTask> UpdateTask(@PathVariable(value = "id") Long taskId, @Valid @RequestBody KanbanTask updatedKanbanTask)
            throws ResourceNotFoundException {
        KanbanTask kanbanTask = _taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found for this id :: " + taskId));

        kanbanTask.setStatus(updatedKanbanTask.getStatus());
        kanbanTask.setCompleteDate(updatedKanbanTask.getCompleteDate());
        final KanbanTask savedKanbanTask = _taskRepository.save(kanbanTask);
        return new ResponseEntity<>(savedKanbanTask, HttpStatus.OK);
    }

    @RequestMapping(value = "/tasks/{id}" , method = RequestMethod.DELETE)
    public ResponseEntity<KanbanTask> DeleteTask(@PathVariable(value = "id") Long taskId)
            throws ResourceNotFoundException {
        KanbanTask kanbanTask = _taskRepository.findById(taskId).orElseThrow(() -> new ResourceRequestDeniedException("Task not found for this id :: " + taskId));
        _taskRepository.delete(kanbanTask);
        return new ResponseEntity<>(kanbanTask, HttpStatus.OK);
    }


}
