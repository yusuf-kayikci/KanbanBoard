package com.example.kanbanboard.model;

import javax.persistence.*;


@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "dueDate", nullable = false)
    private String dueDate;

    @Column(name = "completeDate", nullable = false)
    private String completedDate;

    @Column(name = "status", nullable = false)
    private TaskStatus status;




    public long GetId(){
        return this.id;
    }

    public void SetId(int id){
        this.id = id;
    }





    public String GetTitle(){
        return this.title;
    }
    public void SetTitle(String title){
        this.title = title;
    }

    public String GetContent(){
        return this.content;
    }
    public void SetContent(String content){
        this.content = content;
    }



    public String GetDueDate(){
        return this.dueDate;
    }
    public void SetDueDate(String dueDate){
        this.dueDate = dueDate;
    }



    public String GetCompleteDate(){
        return this.completedDate;
    }
    public void SetCompleteDate(String completeDate){
        this.completedDate = completeDate;
    }



    public TaskStatus GetStatus(){
        return this.status;
    }

    public void SetStatus(TaskStatus status){
        this.status = status;
    }



}
