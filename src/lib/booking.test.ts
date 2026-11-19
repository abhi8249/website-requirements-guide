import { describe, expect, it } from "vitest";
import { emptyScreening, formatINR, orderTotal, validateBooking, validateScreening } from "./booking";

const valid = () =>
  emptyScreening({
    date: "2026-12-01",
    time: "07:30",
    meridiem: "AM",
    name: "Rahul Sharma",
    age: "45",
    countryCode: "+91",
    phone: "8977008754",
    email: "info@umanghealth.com",
    address: "12 MG Road, Bengaluru 560001",
  });

describe("booking rules", () => {
  it("one home screening costs ₹500 + ₹25 fee = ₹525.00", () => {
    expect(orderTotal(1)).toBe(525);
    expect(formatINR(orderTotal(1))).toBe("₹525.00");
  });

  it("each extra screening adds ₹500, fee charged once", () => {
    expect(orderTotal(2)).toBe(1025);
  });

  it("rejects past dates", () => {
    expect(validateScreening({ ...valid(), date: "2026-11-18" }, "2026-11-19").date).toBeDefined();
    expect(validateScreening(valid(), "2026-11-19").date).toBeUndefined();
  });

  it("requires a 10-digit Indian mobile starting 6–9 for +91", () => {
    expect(validateScreening({ ...valid(), phone: "5977008754" }, "2026-11-19").phone).toBeDefined();
    expect(validateScreening({ ...valid(), phone: "89770087" }, "2026-11-19").phone).toBeDefined();
  });

  it("accepts ages 18 to 100 only", () => {
    expect(validateScreening({ ...valid(), age: "17" }, "2026-11-19").age).toBeDefined();
    expect(validateScreening({ ...valid(), age: "101" }, "2026-11-19").age).toBeDefined();
    expect(validateScreening({ ...valid(), age: "18" }, "2026-11-19").age).toBeUndefined();
  });

  it("cannot proceed to payment without accepting terms", () => {
    expect(validateBooking([valid()], false, "2026-11-19").valid).toBe(false);
    expect(validateBooking([valid()], true, "2026-11-19").valid).toBe(true);
  });
});
