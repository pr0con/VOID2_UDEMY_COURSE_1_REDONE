package procon_asyncq

import (
	"fmt"
)

type Task interface {
	Perform()
}

var TaskQueue chan Task
var TaskWorkerQueue chan chan Task

type TaskWorker struct {
	ID              int
	TaskChannel     chan Task
	TaskWorkerQueue chan chan Task
}

func NewTaskWorker(id int, taskWorkerQueue chan chan Task) TaskWorker {
	taskWorker := TaskWorker{
		ID:              id,
		TaskChannel:     make(chan Task),
		TaskWorkerQueue: taskWorkerQueue,
	}

	return taskWorker
}

func (t *TaskWorker) Start() {
	go func() {
		for {
			t.TaskWorkerQueue <- t.TaskChannel

			select {
			case task := <-t.TaskChannel:
				fmt.Printf("Asynchronous task worker #%d is performing a task.\n", t.ID)
				task.Perform()

			}
		}
	}()
}

func StartTaskDispatcher(taskWorkerSize int) {

	TaskWorkerQueue = make(chan chan Task, taskWorkerSize)

	for i := 0; i < taskWorkerSize; i++ {
		fmt.Print("Starting asynchronous task worker #", i+1,"\n")
		taskWorker := NewTaskWorker(i+1, TaskWorkerQueue)
		taskWorker.Start()
	}

	go func() {
		for {
			select {
			case task := <-TaskQueue:
				go func() {
					taskChannel := <-TaskWorkerQueue
					taskChannel <- task
				}()
			}
		}
	}()
}

func init() {
	TaskQueue = make(chan Task, 108)
}
