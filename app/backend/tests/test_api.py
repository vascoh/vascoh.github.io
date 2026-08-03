from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_compute_match_endpoint():
    payload = {
        "profile": {
            "top_skills": ["TypeScript"],
            "target_roles": ["Frontend Engineer"],
        },
        "job": {
            "id": "remoteok:1",
            "title": "Frontend Engineer",
            "company": "Acme",
            "location": "Remote",
            "remote": True,
            "source": "RemoteOK",
            "url": "https://example.com/1",
            "description": "TypeScript role",
            "tags": ["typescript"],
        },
    }
    response = client.post("/api/matches", json=payload)
    assert response.status_code == 200
    assert response.json()["score"] > 0


def test_compute_match_endpoint_rejects_empty_profile():
    payload = {
        "profile": {},
        "job": {
            "id": "remoteok:1",
            "title": "Frontend Engineer",
            "company": "Acme",
            "location": "Remote",
            "remote": True,
            "source": "RemoteOK",
            "url": "https://example.com/1",
        },
    }
    response = client.post("/api/matches", json=payload)
    assert response.status_code == 400
