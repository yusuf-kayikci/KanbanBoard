package com.example.kanbanboard.repository;
import com.example.kanbanboard.model.KanbanTask;
import com.example.kanbanboard.model.KanbanTaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<KanbanTask,Long>  {
    List<KanbanTask> findAllByStatus(KanbanTaskStatus status);
}
