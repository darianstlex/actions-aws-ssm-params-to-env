const { SSMClient, GetParametersByPathCommand, GetParametersCommand } = require('@aws-sdk/client-ssm');

const getParameters = async (ssmPath, getChildren, decryption, region) => {
  const client = new SSMClient({ region });

  const command = getChildren
    ? new GetParametersByPathCommand({
    Path: ssmPath,
    WithDecryption: decryption,
    })
    : new GetParametersCommand({
      Names: [ssmPath],
      WithDecryption: decryption,
    });
  const response = await client.send(command);
  return response.Parameters;
};

module.exports = {getParameters};
