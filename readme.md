## Report Api

> This API has been made using Node.js/express as backend and MongoDB as the database.

## Usage

    1. Clone the repository to your local maching by running the following command:

    	git clone <repoID>

    2. Open CMD/terminal in the folder and type the following command:

    	i. npm install

    3. Now to run the server type the following command:

    	npm run dev

### There are 2 end points in the api:

    1. POST /reports:

    	i. This api end point handles the creation and updation of a report and returns the reportID as a response:
    	{
    		"success": true,
    		"reportID": "reportID"
    	}

    2. GET /reports/<reportID>

    	i. This api end point generates the report based on reportID supplied as a parameter
