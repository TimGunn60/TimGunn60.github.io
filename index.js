document.addEventListener('DOMContentLoaded', function() {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabPanels = document.querySelectorAll('.tab-panel');

    //Handling hamburger icon
    const menuIcon = document.querySelector('.menu-icon');
    const navTabs = document.querySelector('.nav-tabs');

    if (menuIcon && navTabs) {
        menuIcon.addEventListener('click', () => {
            navTabs.classList.toggle('open');
        });
    }

    //Tab switching and menu closing 
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            //Close the mobile menu when a tab link is clicked
            if (navTabs) {
                navTabs.classList.remove('open');
            }

            //Remove active class from all tabs and panels
            tabLinks.forEach(tab => tab.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            //Add active class to clicked tab
            this.classList.add('active');
            
            //Get target from href
            const targetTab = this.getAttribute('href').substring(1);
            const targetPanel = document.getElementById(targetTab);
            
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    //Weather and Animation code
    fetchWeather();
    setInterval(fetchWeather, 600000);

    const links = document.querySelectorAll("a.cipher");
    const solveMilliseconds = 800;
    const characterSelectionMilliseconds = 40;
    const delayMilliseconds = 250;
    const characters = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890*#@/*!%&^"];
    const originalTextMap = new Map();
    const ctaMessage = document.getElementById("ctaMessage");

    const randomArrayElement = (arr) => {
        return arr[(arr.length * Math.random()) | 0];
    };

    function generateScrambledText(length) {
        let scrambled = "";
        for (let i = 0; i < length; i++) {
            scrambled += randomArrayElement(characters);
        }
        return scrambled;
    }

    links.forEach((element) => {
        const finalText = element.innerText;
        originalTextMap.set(element.id, finalText);
        element.innerText = generateScrambledText(finalText.length);
    });

    function unscrambleText(element, targetText) {
        if (!element.classList.contains("active")) {
            let delay = 0;
            const targetCharacters = [...targetText];
            const lockMilliseconds = delayMilliseconds * targetCharacters.length + solveMilliseconds;

            element.classList.add("active");
            setTimeout(() => {
                element.classList.remove("active");
            }, lockMilliseconds);

            targetCharacters.forEach((character, index) => {
                setTimeout(() => {
                    let intervalId = setInterval(() => {
                        const randomCharacter = randomArrayElement(characters);
                        element.innerText = replaceCharacter(element.innerText, index, randomCharacter);
                        setTimeout(() => {
                            clearInterval(intervalId);
                            element.innerText = replaceCharacter(element.innerText, index, targetCharacters[index]);
                        }, solveMilliseconds);
                    }, characterSelectionMilliseconds);
                }, delay === 0 ? (delay = 1) : (delay += delayMilliseconds));
            });
            return lockMilliseconds;
        }
        return 0;
    }

    function handleTabActivation(tabPanelId) {
        const activePanel = document.getElementById(tabPanelId);

        if (!activePanel) {
            console.warn(`Tab panel with ID '${tabPanelId}' not found in DOM.`);
            return;
        }

        if (ctaMessage) {
            ctaMessage.classList.remove("show");
            ctaMessage.classList.remove("hide");
            ctaMessage.style.opacity = '0';
            ctaMessage.style.transform = 'translateY(50px) rotateX(-90deg)';
        }

        const cipherLinksInTab = activePanel.querySelectorAll("a.cipher");

        cipherLinksInTab.forEach((link) => {
            const originalText = originalTextMap.get(link.id);

            if (originalText) {
                link.innerText = generateScrambledText(originalText.length);

                setTimeout(() => {
                    const unscrambleDuration = unscrambleText(link, originalText);

                    if (tabPanelId === 'home' && ctaMessage) {
                        setTimeout(() => {
                            ctaMessage.classList.add("show");
                        }, unscrambleDuration + 200);
                    }
                }, 800);
            } else {
                console.error(`ERROR: Original text not found in map for link ID: '${link.id}'.`);
            }
        });
    }

    function replaceCharacter(str, index, chr) {
        return `${str.substring(0, index)}${chr}${str.substring(index + 1)}`;
    }

    const initiallyActiveTab = document.querySelector(".tab-panel.active");
    if (initiallyActiveTab) {
        handleTabActivation(initiallyActiveTab.id);
    }

    const tabNavLinks = document.querySelectorAll(".tab-nav a");
    tabNavLinks.forEach((navLink) => {
        navLink.addEventListener("click", function (event) {
            event.preventDefault();

            const targetTabId = this.getAttribute("href").substring(1);

            document.querySelector(".tab-panel.active")?.classList.remove("active");
            document.getElementById(targetTabId)?.classList.add("active");

            handleTabActivation(targetTabId);

            document.querySelector(".tab-nav a.active")?.classList.remove("active");
            this.classList.add("active");
        });
    });
});

// Weather API function
async function fetchWeather() {
    try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=38.6270&longitude=-90.1994&current_weather=true&temperature_unit=fahrenheit');
        const data = await response.json();
        
        const temp = Math.round(data.current_weather.temperature);
        const weatherCode = data.current_weather.weathercode;
        
        document.getElementById('weather-temp').textContent = `${temp}° F`;
        
        const weatherIconClass = getWeatherIcon(weatherCode);
        const iconElement = document.getElementById('weather-icon');
        iconElement.className = weatherIconClass;

        applyWeatherColor(iconElement, weatherCode);
        
    } catch (error) {
        console.error('Error fetching weather:', error);
        document.getElementById('weather-temp').textContent = 'No Data';
        document.getElementById('weather-icon').className = 'wi wi-day-sunny';
    }
}

function applyWeatherColor(iconElement, weatherCode) {
    //Remove existing color classes
    iconElement.classList.remove('sunny', 'rainy', 'default');
    
    //Sunny conditions
    if (weatherCode === 0) {
        iconElement.classList.add('sunny');
    }
    //Partly Cloudy
    else if (weatherCode === 1 || weatherCode === 2) {
         iconElement.classList.add('partly-cloudy');
    }
    // Rainy conditions (drizzle, rain, showers)
    else if ([51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99].includes(weatherCode)) {
        iconElement.classList.add('rainy');
    }
    // Everything else (cloudy, snow, thunderstorm, fog, etc.)
    else {
        iconElement.classList.add('default');
    }
}

function getWeatherIcon(code) {
    // ... (rest of the function is unchanged)
    const weatherIcons = {
        0: 'wi wi-day-sunny',      // Clear sky
        1: 'wi wi-day-sunny-overcast', // Mainly clear
        2: 'wi wi-day-cloudy',     // Partly cloudy
        3: 'wi wi-cloudy',         // Overcast
        45: 'wi wi-fog',           // Fog
        48: 'wi wi-fog',           // Depositing rime fog
        51: 'wi wi-sprinkle',      // Light drizzle
        53: 'wi wi-sprinkle',      // Moderate drizzle
        55: 'wi wi-sprinkle',      // Dense drizzle
        61: 'wi wi-rain',          // Slight rain
        63: 'wi wi-rain',          // Moderate rain
        65: 'wi wi-rain',          // Heavy rain
        71: 'wi wi-snow',          // Slight snow
        73: 'wi wi-snow',          // Moderate snow
        75: 'wi wi-snow',          // Heavy snow
        77: 'wi wi-snow',          // Snow grains
        80: 'wi wi-showers',       // Slight rain showers
        81: 'wi wi-showers',       // Moderate rain showers
        82: 'wi wi-showers',       // Violent rain showers
        85: 'wi wi-snow',          // Slight snow showers
        86: 'wi wi-snow',          // Heavy snow showers
        95: 'wi wi-thunderstorm',  // Thunderstorm
        96: 'wi wi-thunderstorm',  // Thunderstorm with slight hail
        99: 'wi wi-thunderstorm'   // Thunderstorm with heavy hail
    };
    
    return weatherIcons[code] || 'wi wi-day-sunny';
}
