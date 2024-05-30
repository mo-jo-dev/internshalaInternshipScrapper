import puppeteer from "puppeteer";

const getJobs = async () => {
    const browser = await puppeteer.launch({
        product:'chrome',
        headless: false,
        defaultViewport: null,
        
    });
    
    const page = await browser.newPage();

    await page.goto("https://internshala.com/internships",{
        waitUntil: "domcontentloaded",
    });

    const jobs = await page.evaluate(() => {

        const jobList = document.querySelectorAll(".container-fluid.individual_internship.visibilityTrackerItem ")
        
        return Array.from(jobList).map((individual_internship) => {
            const role = individual_internship.querySelector(".internship_meta > .individual_internship_header > .company > h3").textContent;
            
            const company = individual_internship.querySelector(".company_and_premium > p").textContent;
            
            const location = individual_internship.querySelector("#location_names > span > a").textContent;

            return {role, company, location};
        });
    })

    console.log(jobs);

    await browser.close();

};

getJobs();