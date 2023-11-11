import { describe, it, before } from 'node:test';
import assert from 'node:assert';

// node --test

describe("POST newuser operations", async () => {
    const url = { url: "https://youtu.be/qU6CKLe3q24" };
    //Isn't available
    const badUrl = { url: "https://youtu.be/qU6CKLe3q2" };
    const badJson = { not_url: "https://youtu.be/qU6CKLe3q24" };
    let response, body, failedResponse, failedResponse2;

    before(async () => {
        response = await fetch("http://localhost:4000/api/get_link_data", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(url)
        });
        body = await response.text();

        failedResponse = await fetch("http://localhost:4000/api/get_link_data", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(badUrl)
        });
        
        failedResponse2 = await fetch("http://localhost:4000/api/get_link_data", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(badJson)
        });
    })

    it('should respond with 200', async () => {
        assert.equal(response.status, 200);
    })
    
    it('should return a static phrase', async () => {
        assert.equal(body, "User has been created");
    });

    it('should fail if URL isn\'t good', async () => {
        assert.equal(failedResponse.status, 500);
    });

    it('should fail if json doens\'t include \'url\'', async () => {
        assert.equal(failedResponse2.status, 400);
    });
});