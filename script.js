// ==========================================================================
// Mock Data API Simulation Functions
// ==========================================================================

function fetchUserProfile(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const user = {
                id: userId,
                name: "Gabriel Green",
                email: "gabriel@gardenhouse.com",
                username: "gg_garden"
            };
            resolve(user);
        }, 1000);
    });
}

function fetchUserPosts(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const posts = [
                { postId: 101, userId: userId, title: "Propagating Swiss Cheese Vines", content: "Ensure optimal node segmentation before positioning cuttings inside room-temperature water systems." },
                { postId: 102, userId: userId, title: "Pruning Your Overwinter Bonsai", content: "Focus on balancing external structural energy distribution rules during seasonal transition periods." },
                { postId: 103, userId: userId, title: "Soil PH Optimization Formulas", content: "Slight adjustments to localized peat-moss distribution ratios radically alter flower pigment saturation levels." }
            ];
            resolve(posts);
        }, 1500);
    });
}

// Part 4 Task F: Infusing Unreliability into Comment Resolution Operations
function fetchPostComments(postId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulated 30% failure chance rule configuration
            if (Math.random() < 0.3) {
                reject(new Error(`Network exception thrown while locating comments for Post ID ${postId}`));
                return;
            }

            const commentsDatabase = {
                101: [
                    { commentId: 1, postId: 101, username: "botanist_99", comment: "Incredibly useful! My cuttings are growing roots already." },
                    { commentId: 2, postId: 101, username: "fern_lover", comment: "Should I keep the container in direct ambient sunlight?" }
                ],
                102: [
                    { commentId: 3, postId: 102, username: "zen_garden", comment: "Beautiful breakdown. This clarity saved my miniature pine." }
                ],
                103: [
                    { commentId: 4, postId: 103, username: "soil_scientist", comment: "Excellent evaluation of acidity adjustments." },
                    { commentId: 5, postId: 103, username: "bloom_watcher", comment: "Trying this out on my hydrangea bushes immediately!" }
                ]
            };

            resolve(commentsDatabase[postId] || []);
        }, 2000);
    });
}

// ==========================================================================
// Control Strategies (Sequential vs Parallel Architecture)
// ==========================================================================


// Sequential Flow with Graceful Error Handling Challenge

async function fetchDataSequentially(userId) {
    console.log('Starting sequential fetch waterfall sequence...');
    const startTime = Date.now();
    const errorsEncountered = [];
    
    try {
        const user = await fetchUserProfile(userId);
        console.log("User profile retrieved successfully.");
        
        const posts = await fetchUserPosts(userId);
        console.log("Posts retrieved successfully.");
        
        const postsWithComments = [];
        for (const post of posts) {
            try {
                const comments = await fetchPostComments(post.postId);
                console.log(`Comments retrieved for post ${post.postId}`);
                postsWithComments.push({ ...post, comments });
            } catch (error) {
                console.warn(error.message);
                errorsEncountered.push(error.message);
                // Graceful resilience: Keep the post data layout block alive, pass empty array fallback
                postsWithComments.push({ ...post, comments: [], error: true });
            }
        }
        
        const endTime = Date.now();
        const performanceDelta = endTime - startTime;
        console.log(`Sequential execution terminated inside: ${performanceDelta}ms`);
        
        return {
            strategy: "Sequential Processing Engine",
            duration: performanceDelta,
            user,
            posts: postsWithComments,
            errors: errorsEncountered
        };
        
    } catch (error) {
        console.error('Fatal failure inside core sequential waterfall scope:', error.message);
        return { strategy: "Sequential", error: true, message: error.message };
    }
}

// Task E & G: Distributed Parallel Flow with Promise.all Mapping
async function fetchDataInParallel(userId) {
    console.log('Starting asynchronous concurrent parallel data pipeline...');
    const startTime = Date.now();
    const errorsEncountered = [];
    
    try {
        // Resolve Profile and Posts collections synchronously via simultaneous network tracking 
        const [user, posts] = await Promise.all([
            fetchUserProfile(userId),
            fetchUserPosts(userId)
        ]);
        console.log('User identity properties and primary posts index isolated concurrently.');
        
        // Execute sub-queries concurrently across mapped arrays
        const commentPromises = posts.map(async (post) => {
            try {
                const comments = await fetchPostComments(post.postId);
                return { ...post, comments };
            } catch (error) {
                console.warn(error.message);
                errorsEncountered.push(error.message);
                return { ...post, comments: [], error: true };
            }
        });
        
        const postsWithComments = await Promise.all(commentPromises);
        console.log('All parallel sub-requests finalized.');
        
        const endTime = Date.now();
        const performanceDelta = endTime - startTime;
        console.log(`Parallel processing framework wrapped execution inside: ${performanceDelta}ms`);
        
        return {
            strategy: "Concurrent Parallel Engine",
            duration: performanceDelta,
            user,
            posts: postsWithComments,
            errors: errorsEncountered
        };
        
    } catch (error) {
        console.error('Fatal failure within high-speed concurrent network thread layout:', error.message);
        return { strategy: "Parallel", error: true, message: error.message };
    }
}

// ==========================================================================
// Part 6: Document Layout Manipulation & Rendering Engine
// ==========================================================================

function displayResults(data, container) {
    // Clear out standard fallback text parameters cleanly
    container.innerHTML = "";
    
    if (!data || data.error) {
        container.innerHTML = `<div class="error-banner"><strong>Fatal Processing Crash:</strong> ${data?.message || 'Unknown network error state isolated.'}</div>`;
        return;
    }

    // Performance Header Element Card
    const performanceCard = document.createElement('div');
    performanceCard.className = 'meta-info';
    performanceCard.innerHTML = `Strategy Selected: ${data.strategy} | Network Operations Finalized in: ${data.duration}ms`;
    container.appendChild(performanceCard);

    // If non-fatal component errors were trapped, flag them dynamically via standard UI notifications
    if (data.errors && data.errors.length > 0) {
        data.errors.forEach(err => {
            const errDiv = document.createElement('div');
            errDiv.className = 'error-banner';
            errDiv.innerHTML = `<strong>Graceful Recovery Event:</strong> ${err} (Returned partial object tree layout safely)`;
            container.appendChild(errDiv);
        });
    }

    // User Identity Card Element Setup
    const userCard = document.createElement('div');
    userCard.className = 'user-card';
    userCard.innerHTML = `
        <h2>User Record: ${data.user.name}</h2>
        <p><strong>Handle:</strong> @${data.user.username} | <strong>Contact:</strong> ${data.user.email} (ID Key: ${data.user.id})</p>
    `;
    container.appendChild(userCard);

    // Mapped Collection Generator iterating down structural posts arrays
    data.posts.forEach(post => {
        const postCard = document.createElement('article');
        postCard.className = 'post-card';
        postCard.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <div class="comments-section">
                <strong>Thread Comments Section:</strong>
                ${post.error ? '<p style="color:#c62828; font-style:italic;">Comments unavailable for this index block due to structural fetch failure rules.</p>' : ''}
                ${post.comments.length === 0 && !post.error ? '<p style="color:#777; font-style:italic;">No active discussion signatures logged under this content card entry.</p>' : ''}
                ${post.comments.map(c => `
                    <div class="comment-item">
                        <strong>${c.username}:</strong> ${c.comment}
                    </div>
                `).join('')}
            </div>
        `;
        container.appendChild(postCard);
    });
}

// ==========================================================================
// Event Listeners Integration Setup
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const outputContainer = document.getElementById('output');
    const seqButton = document.getElementById('sequentialBtn');
    const parButton = document.getElementById('parallelBtn');
    
    seqButton.addEventListener('click', async () => {
        outputContainer.innerHTML = '<p style="color: #0288d1; font-weight: bold; font-style: italic;">Engaging step-by-step waterfall sequence... (Approx ~4.5 seconds execution runtime)</p>';
        const results = await fetchDataSequentially(42);
        displayResults(results, outputContainer);
    });
    
    parButton.addEventListener('click', async () => {
        outputContainer.innerHTML = '<p style="color: #2e7d32; font-weight: bold; font-style: italic;">Spawning parallel request threads... (Optimized runtime down to ~2.0-2.5 seconds total)</p>';
        const results = await fetchDataInParallel(42);
        displayResults(results, outputContainer);
    });
});