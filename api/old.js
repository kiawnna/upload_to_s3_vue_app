const to = require('await-to-js');
const AWS = require('aws-sdk');

module.exports.main = async event => {
    // eslint-disable-next-line no-console
    console.log(event);
    switch (event.service) {
        case 'dynamodb':
            var dynamo = new AWS.DynamoDB.DocumentClient({region: event.region});
            return call(event, dynamo);

        case 'ssm':
            var ssm = new AWS.SSM({region: event.region});
            return call(event, ssm);

        case 'secretsmanager':
            var secretsManager = new AWS.SecretsManager({region: event.region});
            return call(event, secretsManager);

        case 'stepfunctions':
            var stepFunctions = new AWS.StepFunctions({region: event.region});
            return call(event, stepFunctions);

        case 'ecs':
            var ecs = new AWS.ECS({region: event.region});
            return call(event, ecs);

        case 'cloudformation':
            var cloudformation = new AWS.CloudFormation({region: event.region});
            return call(event, cloudformation);

        default:
            return {
                message: 'You have not chosen a valid AWS service to interact with.',
                event
            };

    }
};

async function call(event, client) {
    let err, data;
    [err, data] = await to.to(perform(event.method, event.servicePayload, client));
    if (err) throw err;
    return data;
}

function perform(action, params, client) {
    return client[action](params).promise();
}
