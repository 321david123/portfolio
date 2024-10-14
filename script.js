// Replace 'your-username' with your actual GitHub username
const githubUsername = '321david123';

// List of repository names to display (replace with your desired repositories)
const repositoriesToDisplay = ['finalruedatec','upgraded-global-chat'];

// Show loading indicator
const loading = document.getElementById('loading');
loading.style.display = 'block';

// Fetch repositories from GitHub API
fetch(`https://api.github.com/users/${githubUsername}/repos`, {
    headers: {
        'Accept': 'application/vnd.github.mercy-preview+json'
    }
})
    .then(response => {
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // console.log(data)
        const repoList = document.getElementById('repo-list');

        // Filter repositories
        // console.log(repoList)
        const filteredRepos = data.filter(repo => repositoriesToDisplay.includes(repo.name));
        // console.log(filteredRepos)
        if (filteredRepos.length === 0) {
            // console.log('here')
            repoList.innerHTML = '<p class="text-center">No repositories to display.</p>';
            return;
        }

        filteredRepos.forEach(repo => {
            // Create column
            const col = document.createElement('div');
            col.className = 'col-sm-12 col-md-6 col-lg-4 d-flex align-items-stretch';

            // Create card
            const card = document.createElement('div');
            card.className = 'card repo-card';

            // Optional: Add repository image if available
            // const cardImage = document.createElement('img');
            // cardImage.className = 'card-img-top';
            // cardImage.src = 'path_to_image.jpg'; // Replace with your image path
            // cardImage.alt = `${repo.name} image`;
            // card.appendChild(cardImage);

            // Create card body
            const cardBody = document.createElement('div');
            cardBody.className = 'card-body d-flex flex-column';

            // Repository Name
            const repoName = document.createElement('h5');
            repoName.className = 'card-title';
            repoName.textContent = repo.name;

            // Repository Description
            const repoDescription = document.createElement('p');
            repoDescription.className = 'card-text';
            repoDescription.textContent = repo.description || 'No description provided';

            // Additional Information (Stars, Forks, Language, etc.)
            const repoDetails = document.createElement('ul');
            repoDetails.className = 'list-group list-group-flush mb-3';

            // Stars
            const starsItem = document.createElement('li');
            starsItem.className = 'list-group-item';
            starsItem.innerHTML = `<i class="fas fa-star"></i> ${repo.stargazers_count} Stars`;

            // Forks
            const forksItem = document.createElement('li');
            forksItem.className = 'list-group-item';
            forksItem.innerHTML = `<i class="fas fa-code-branch"></i> ${repo.forks_count} Forks`;

            // Programming Language
            const languageItem = document.createElement('li');
            languageItem.className = 'list-group-item';
            languageItem.innerHTML = `<i class="fas fa-code"></i> ${repo.language || 'N/A'}`;

            // Last Updated Date
            const updatedDate = new Date(repo.updated_at).toLocaleDateString();
            const updatedItem = document.createElement('li');
            updatedItem.className = 'list-group-item';
            updatedItem.innerHTML = `<i class="fas fa-calendar-alt"></i> Updated on ${updatedDate}`;

            // Append details to repoDetails
            repoDetails.appendChild(starsItem);
            repoDetails.appendChild(forksItem);
            repoDetails.appendChild(languageItem);
            repoDetails.appendChild(updatedItem);

            // Repository Link
            const repoLink = document.createElement('a');
            repoLink.href = repo.html_url;
            repoLink.className = 'btn btn-primary mt-auto';
            repoLink.innerHTML = '<i class="fab fa-github"></i> View on GitHub';
            repoLink.target = '_blank';
            repoLink.rel = 'noopener noreferrer';

            // Append elements to card body
            cardBody.appendChild(repoName);
            cardBody.appendChild(repoDescription);
            cardBody.appendChild(repoDetails);
            cardBody.appendChild(repoLink);

            // Append card body to card
            card.appendChild(cardBody);

            // Append card to column
            col.appendChild(card);

            // Append column to repo list
            repoList.appendChild(col);
        });

        // Hide loading indicator
        loading.style.display = 'none';
    })
    .catch(error => {
        console.error('Error fetching repositories:', error);
        const repoList = document.getElementById('repo-list');
        repoList.innerHTML = '<p class="text-danger text-center">Failed to load repositories. Please try again later.</p>';
        // Hide loading indicator
        loading.style.display = 'none';
    });