using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace TaskAPI.Properties
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExercisesController : ControllerBase
    {
        // Matches GET api/exercises/42
        [HttpGet]
        public IActionResult GetSum(double param1, double param2)
        {
            return Ok(param1 + param2);
        }

        [HttpPost]
        public IActionResult CalculateSum(List<double> values)
        {
            if (values == null || values.Count == 0)
                return BadRequest("Lista de numere este null sau goală.");

            double sum = 0;
            foreach (var value in values)
            {
                sum += value;
            }
            return Ok(sum);
        }

        private static List<string> hardcodedValues = new List<string> { "Value1", "Value2", "Value3" };
        [HttpGet]
        [Route("api/exercises/hardcodedvalues")]
        public IActionResult GetHardcodedValues()
        {
            return Ok(hardcodedValues);
        }

        [HttpGet("update/{index}")]
        public IActionResult UpdateListValue(int index, [FromBody] string value)
        {
            if (index < 0 || index >= hardcodedValues.Count)
                return BadRequest("Indexul este invalid.");
            if (string.IsNullOrWhiteSpace(value))
                return BadRequest("Valoarea este invalidă.");
            hardcodedValues[index] = value;
            return Ok(hardcodedValues);
        }

        [HttpDelete("delete/{index}")]
        public IActionResult DeleteListValue(int index)
        {
            if (index < 0 || index >= hardcodedValues.Count)
                return BadRequest("Indexul este invalid.");
            hardcodedValues.RemoveAt(index);
            return Ok(hardcodedValues);
        }
    }

}
