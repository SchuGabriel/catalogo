// Função para inserir dados no banco de dados
async function insertData(client, dbName, collectionName, data) {
    try {
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        await collection.insertOne(data);
        console.log("Data inserted successfully.");
    } catch (error) {
        console.error("Error inserting data:", error);
        throw error; 
    }
}

// Função para deletar dados do banco de dados
async function deleteData(client, dbName, collectionName, query) {
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    await collection.deleteOne(query);
}

// Função para atualizar dados no banco de dados
async function updateData(client, dbName, collectionName, query, newData) {
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    await collection.updateOne(query, { $set: newData });
}

module.exports = {
    insertData,
    deleteData,
    updateData
};