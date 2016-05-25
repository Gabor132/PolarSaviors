

function onSubmitComment(){
    var comment = document.createElement("div");
    comment.className = "comment";
    var h5 = document.createElement("h5");
    h5.className = "comment_email";
    var email = document.createElement("a");
    email.setAttribute("href","mailto:"+document.getElementById("input_email").value);
    email.appendChild(document.createTextNode(document.getElementById("input_email").value));
    h5.appendChild(email);
    h5.innerHTML = h5.innerHTML + " says:";
    var content = document.createElement("p");
    content.className = "comment_content";
    content.appendChild(document.createTextNode(document.getElementById("input_content").value));
    comment.appendChild(h5);
    comment.appendChild(content);
    
    document.getElementById("comment_section").appendChild(comment);
    
}