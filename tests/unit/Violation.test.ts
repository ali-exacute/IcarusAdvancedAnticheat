import "../helper/CfxGlobals";
import "../helper/MockNatives";
import "../helper/MockConfig";
import { Logger } from "../../src/core/logger/Logger";
import { Violation } from "../../src/core/Violation";
import { Utility } from "../../src/util/Utility";

Logger.init();
describe("Violation", () => {
	it("should take a screenshot and abort", async () => {
		const violation = new Violation(1, "TestViolation", "TestModule");
		// @ts-ignore
		const takeScreenshot = jest.spyOn(violation, "takeScreenshot");
		await violation.banPlayer();
		expect(takeScreenshot).toHaveBeenCalledTimes(1);
	});
	it("should not ban player if bypassed", async () => {
		// @ts-ignore
		jest.spyOn(Violation.prototype, "takeScreenshot").mockResolvedValue();
		const mockBanPlayer = jest.fn();
		Utility.EXPORTS[Utility.RESOURCE_NAME].BanPlayer = mockBanPlayer;
		// Zero will always have permission in tests
		const violation = new Violation(0, "TestViolation", "TestModule");
		violation.banPlayer();
		expect(mockBanPlayer).toHaveBeenCalledTimes(0);
	});
	it("should ban player if not bypassed", async () => {
		// @ts-ignore
		jest.spyOn(Violation.prototype, "takeScreenshot").mockResolvedValue();
		const mockBanPlayer = jest.fn();
		Utility.EXPORTS[Utility.RESOURCE_NAME].BanPlayer = mockBanPlayer;
		const violation = new Violation(1, "TestViolation", "TestModule");
		await violation.banPlayer();
		expect(mockBanPlayer).toHaveBeenCalledTimes(1);
	});
});
