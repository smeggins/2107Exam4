import { PlantController } from "@/backEnd/dataAccessLayer/actions/plant";
import { ToolController } from "@/backEnd/dataAccessLayer/actions/tool";

// search action for searching for plants by name
export async function SearchPlants(event, searchVal) {
    // perform on enter keypress
    if (event.key === 'Enter') {
        // validation if string is empty
        if (searchVal == "") {
            return null;
        }
        else {
            // make an API fetch request to get plants that match search val
            const response = await fetch(
                `http://localhost:3000/api/getPlants?name=${searchVal}`,
                {  
                    method: 'GET'
                }
            );
            // catches the response
            const rateResponse = await response.json();
            // parses response
            const newPlants = JSON.parse(JSON.stringify(rateResponse)) as {
                code: number,
                success: boolean,
                plant: PlantController
            }; 

            // if no results return an empty array of plantControllers, otherwise return the results
            if (!newPlants.plant) {
                const empty: [PlantController?] = [];
                return empty;
            } 
            else {
                return [newPlants.plant];
            }
        }
    }
}

// search action for searching for tools by name
export async function SearchTools(event, searchVal) {
    // perform on enter keypress
    if (event.key === 'Enter') {
        // validation if string is empty
        if (searchVal == "") {
            return null;
        }
        else {
            // make an API fetch request to get tools that match search val
            const response = await fetch(
                `http://localhost:3000/api/getTools?name=${searchVal}`,
                {  
                    method: 'GET'
                }
            );
            // catches the response
            const rateResponse = await response.json();
            // parses response
            const newTools = JSON.parse(JSON.stringify(rateResponse)) as {
                code: number,
                success: boolean,
                tool: ToolController
            }; 

            // if no results return an empty array of ToolControllers, otherwise return the results
            if (!newTools.tool) {
                const empty: [ToolController?] = [];
                return empty;
            } 
            else {
                return [newTools.tool];
            }
        }
    }
}