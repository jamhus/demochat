using System;
using System.Diagnostics.CodeAnalysis;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using demochat.Hubs;
//using demochat.Models;

namespace demochat.Controllers
{
    [ApiController]
    [Route("/api/message")]
    public class MessageController : Controller
    {
        protected readonly IHubContext<MessageHub> _messageHub;

        public MessageController( [NotNull] IHubContext<MessageHub> messageHub)
        {
            _messageHub = messageHub;
        }

        [HttpPost]
        public async Task<IActionResult> Create(MessagePost messagePost)
        {
            await _messageHub.Clients.All.SendAsync("sendToReact", messagePost.Message );
            return Ok();
        }

       
    }

    public class MessagePost 
    {
        public virtual string Message {get;set;}
    }
}