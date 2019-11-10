package com.example.kanbanboard.model;

import javax.persistence.*;


@Entity
@Table(name = "tasks")
public class Task {

    private long id;
    private String title;
    private String content;
    private String dueDate;
    private String completedDate;
    private TaskStatus status;



    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long getId(){
        return this.id;
    }

    public void setId(long id){
        this.id = id;
    }




    @Column(name = "title", nullable = false)
    public String getTitle(){
        return this.title;
    }

    public void setTitle(String title){
        this.title = title;
    }

    @Column(name = "content", nullable = true)
    public String getContent(){
        return this.content;
    }
    public void setContent(String content){
        this.content = content;
    }


    @Column(name = "due_date", nullable = false)
    public String getDueDate(){
        return this.dueDate;
    }


    public void setDueDate(String dueDate){
        this.dueDate = dueDate;
    }


    @Column(name = "complete_date", nullable = true)
    public String getCompleteDate(){
        return this.completedDate;
    }


    public void setCompleteDate(String completeDate){
        this.completedDate = completeDate;
    }


    @Column(name = "status", nullable = false)
    public TaskStatus getStatus(){
        return this.status;
    }

    public void setStatus(TaskStatus status){
        this.status = status;
    }



}
