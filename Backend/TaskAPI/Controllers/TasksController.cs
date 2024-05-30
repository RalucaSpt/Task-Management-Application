using Microsoft.AspNetCore.Mvc;
using TaskAPI.Models;
using TaskAPI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly ITaskCollectionService _taskCollectionService;

        public TasksController(ITaskCollectionService taskCollectionService)
        {
            _taskCollectionService = taskCollectionService ?? throw new ArgumentNullException(nameof(taskCollectionService));
        }

        [HttpGet]
        public async Task<IActionResult> GetTasks()
        {
            List<TaskModel> tasks = await _taskCollectionService.GetAll();
            return Ok(tasks);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTask([FromBody] TaskModel task)
        {
            if (task == null)
                return BadRequest("Task is null");

            await _taskCollectionService.Create(task);
            return Ok(task);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(Guid id, [FromBody] TaskModel task)
        {
            if (task == null)
                return BadRequest("Task is null");

            var existingTask = await _taskCollectionService.Get(id);
            if (existingTask == null)
                return NotFound("Task not found");

            task.Id = id;
            await _taskCollectionService.Update(id, task);
            return Ok(task);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(Guid id)
        {
            var task = await _taskCollectionService.Get(id);
            if (task == null)
                return NotFound("Task not found");

            await _taskCollectionService.Delete(id);
            return Ok("Task deleted successfully");
        }
    }
}
