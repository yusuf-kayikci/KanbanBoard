package com.example.kanbanboard.repository;

import com.example.kanbanboard.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface TaskRepository extends JpaRepository<Task,Long>  {

}
