const formElement = document.getElementById("resume-Form") as HTMLFormElement;
const DisplayElement = document.getElementById("resume-display") as HTMLElement;
const shareableLinkDiv = document.getElementById("Shareable-link-div") as HTMLDivElement;
const shareableLinkElement = document.getElementById("Shareable-link") as HTMLAnchorElement;
const downloadPdfButton = document.getElementById("download-pdf") as HTMLButtonElement;

formElement.addEventListener("submit", (event: Event) => {
    event.preventDefault();

    const username = (document.getElementById("username") as HTMLInputElement).value
    const name = (document.getElementById("name") as HTMLInputElement).value
    const email = (document.getElementById("email") as HTMLInputElement).value
    const phone = (document.getElementById("number") as HTMLInputElement).value
    const education = (document.getElementById("education") as HTMLInputElement).value
    const experience = (document.getElementById("experience") as HTMLInputElement).value
    const skills = (document.getElementById("skills") as HTMLInputElement).value

    const resumeData = {
        name,
        email,
        phone,
        education,
        experience,
        skills
    };
    localStorage.setItem(username, JSON.stringify(resumeData));

    const resumeHtml = `
<h2><b>Editable Resume</b></h2>
<h3>Personal Information</h3>
<p><b>Name:</b><span contenteditable="true">${name}</span></p>
<p><b>Email:</b><span contenteditable="true">${email}</span></p>
<p><b>Phone:</b><span contenteditable="true">${phone}</span></p>

<h3>Education</h3>
<p contenteditable="true">${education}</p>

<h3>Experience</h3>
<p contenteditable="true">${experience}</p>

<h3>Skills</h3>
<p contenteditable="true">${skills}</p>
`;


    DisplayElement.innerHTML = resumeHtml;

    const shareableURL =
        `${window.location.origin}?username=${encodeURIComponent(username)}`;
    shareableLinkDiv.style.display = "block";
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;

});
downloadPdfButton.addEventListener("click", () => {
    window.print();
});
window.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get("username");
    if (username) {

        const savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            const resumeData = JSON.parse(savedResumeData);
            (document.getElementById("username") as HTMLInputElement).value = username;
            (document.getElementById("name") as HTMLInputElement).value = resumeData.name;
            (document.getElementById("email") as HTMLInputElement).value = resumeData.email;
            (document.getElementById("number") as HTMLInputElement).value = resumeData.number;
            (document.getElementById("education") as HTMLInputElement).value = resumeData.education;
            (document.getElementById("experience") as HTMLInputElement).value = resumeData.experience;
            (document.getElementById("skills") as HTMLInputElement).value = resumeData.skills;
        }
    }
});


