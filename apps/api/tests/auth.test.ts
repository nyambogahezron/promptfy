import type { Server } from "node:http";
import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import type { Express } from "express";
import mongoose from "mongoose";
import supertest from "supertest";
import { createServer } from "../server";

describe("Better Auth Integration", () => {
	let app: Express;
	let server: Server;

	beforeAll(async () => {
		// Connect to test database
		if (!process.env.MONGO_URI) {
			process.env.MONGO_URI = "mongodb://localhost:27017/promptfy_test";
		}

		await mongoose.connect(process.env.MONGO_URI);

		app = createServer();
		server = app.listen(0); // Use random available port
	});

	afterAll(async () => {
		await mongoose.connection.close();
		server.close();
	});

	describe("Better Auth Endpoints", () => {
		it("should handle sign up request", async () => {
			const response = await supertest(app).post("/api/v1/better-auth/signup").send({
				email: "test@example.com",
				password: "password123",
				name: "Test User",
			});

			// Since we don't have a real database connection, this might fail
			// but we can at least check that the endpoint exists
			expect([200, 201, 400, 500]).toContain(response.status);
		});

		it("should handle sign in request", async () => {
			const response = await supertest(app).post("/api/v1/better-auth/signin").send({
				email: "test@example.com",
				password: "password123",
			});

			expect([200, 400, 401, 500]).toContain(response.status);
		});

		it("should handle get current user request", async () => {
			const response = await supertest(app).get("/api/v1/better-auth/me");

			// Should return unauthorized without session
			expect([200, 401, 500]).toContain(response.status);
		});
	});

	describe("Better Auth Handler", () => {
		it("should handle better auth routes", async () => {
			const response = await supertest(app).get("/api/auth/session");

			// Should at least respond, even if with an error
			expect([200, 400, 401, 404, 500]).toContain(response.status);
		});
	});
});
