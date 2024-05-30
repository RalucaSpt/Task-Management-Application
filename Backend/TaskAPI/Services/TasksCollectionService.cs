﻿using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using TaskAPI.Models;
using TaskAPI.Settings;

namespace TaskAPI.Services
{
    public class TasksCollectionService : ITaskCollectionService
    {
        private readonly IMongoCollection<TaskModel> _tasks;

        public TasksCollectionService(IMongoDBSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _tasks = database.GetCollection<TaskModel>(settings.TasksCollectionName);
        }

        public async Task<List<TaskModel>> GetAll()
        {
            var result = await _tasks.FindAsync(task => true);

            if (result == null)
            {
                return new List<TaskModel>();
            }   
            return result.ToList();
        }


        public async Task<bool> Create([FromBody]TaskModel taskModel)
        {
            if (taskModel.Id == Guid.Empty)
            {
                taskModel.Id = Guid.NewGuid();
            }

            await _tasks.InsertOneAsync(taskModel);
            return true;
        }

        public async Task<bool> Delete(Guid id)
        {
            var result = await _tasks.DeleteOneAsync(taskModel => taskModel.Id == id);
            if (!result.IsAcknowledged && result.DeletedCount == 0)
            {
                return false;
            }
            return true;
        }

        public async Task<TaskModel> Get(Guid id)
        {
            return (await _tasks.FindAsync(taskModel => taskModel.Id == id)).FirstOrDefault();
        }

        public async Task<bool> Update(Guid id, TaskModel taskModel)
        {
            taskModel.Id = id;
            var result = await _tasks.ReplaceOneAsync(taskModel => taskModel.Id == id, taskModel);
            if (!result.IsAcknowledged && result.ModifiedCount == 0)
            {
                await _tasks.InsertOneAsync(taskModel);
                return false;
            }

            return true;
        }

        public async Task<List<TaskModel>> GetTasksByStatus(string status)
        {
            return (await _tasks.FindAsync(taskModel => taskModel.Status == status)).ToList();
        }
    }
}
