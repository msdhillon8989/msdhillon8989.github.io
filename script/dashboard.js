// create the controller and inject Angular's $scope
gameApp.controller('dashboardController', function ($scope, $location, $timeout) {

    $scope.gotoPage = function (location) {
        $location.path('/'+location);
    }
    
    // Initialize Matrix animation after view loads
    $timeout(function() {
        initMatrixAnimation();
    }, 300);
});

// Matrix Rain Animation Function
function initMatrixAnimation() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) {
        // Retry after a short delay if canvas doesn't exist yet
        setTimeout(initMatrixAnimation, 100);
        return;
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        return;
    }
    
    // Matrix characters - mix of letters, numbers, and symbols
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
    const charArray = chars.split('');
    
    const fontSize = 14;
    let columns = 0;
    const drops = [];
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Recalculate columns after resize
        columns = Math.floor(canvas.width / fontSize);
        // Reinitialize drops array
        drops.length = 0;
        for (let x = 0; x < columns; x++) {
            drops[x] = Math.random() * -100;
        }
    }
    
    // Initialize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    function draw() {
        // Semi-transparent black background for trail effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Green text for matrix effect
        ctx.fillStyle = '#00ff41';
        ctx.font = fontSize + 'px monospace';
        
        // Draw characters
        for (let i = 0; i < drops.length; i++) {
            // Random character
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            
            // Draw character
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            // Reset drop to top randomly
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            // Move drop down
            drops[i]++;
        }
    }
    
    // Clear any existing interval
    if (window.matrixInterval) {
        clearInterval(window.matrixInterval);
    }
    
    // Animation loop
    window.matrixInterval = setInterval(draw, 35);
}