import { TestBed } from "@angular/core/testing";

import { SolisService } from "./solis.service";

describe("SolisService", () => {
  let service: SolisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolisService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
