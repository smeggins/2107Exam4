import { PlantController } from "@/backEnd/dataAccessLayer/actions/plant";
import { ToolController } from "@/backEnd/dataAccessLayer/actions/tool";


export async function SearchPlants(event, searchVal) {
    if (event.key === 'Enter') {
        if (searchVal == "") {
            return null
        }
        else {
            // make an API fetch request to generate a RateCard
            const response = await fetch(
                `http://localhost:3000/api/getPlants?name=${searchVal}`,
                {  
                    method: 'GET'
                }
            );
            const rateResponse = await response.json(); // catches the response
            const newPlants = JSON.parse(JSON.stringify(rateResponse)) as {
                code: number,
                success: boolean,
                plant: PlantController
            }; 

            if (!newPlants.plant) {
                const empty: [PlantController?] = []
                return empty
            } 
            else {
                return [newPlants.plant]
            }
        }
    }
}

export async function SearchTools(event, searchVal) {
    if (event.key === 'Enter') {
        if (searchVal == "") {
            return null
        }
        else {
            // make an API fetch request to generate a RateCard
            const response = await fetch(
                `http://localhost:3000/api/getTools?name=${searchVal}`,
                {  
                    method: 'GET'
                }
            );
            const rateResponse = await response.json(); // catches the response
            const newTools = JSON.parse(JSON.stringify(rateResponse)) as {
                code: number,
                success: boolean,
                tool: ToolController
            }; 

            if (!newTools.tool) {
                const empty: [ToolController?] = []
                return empty
            } 
            else {
                return [newTools.tool]
            }
        }
    }
}