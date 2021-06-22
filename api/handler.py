import json

def main(event, context):
	response = {
		"statusCode": 200,
		"body": json.dumps({"message": 'yay it whoowhoo'})
	}

	return response
