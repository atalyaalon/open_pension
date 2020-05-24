import {DownloadLinks} from "types/download-links";

const mockGetReports = jest.fn();
const mockSendMessage = jest.fn();
const mockDownloadDocument = jest.fn();
const mockValidateQuery = jest.fn();
const mockSendLinkAddress = jest.fn();
const mockSendFile = jest.fn();

const mockCmaGovApiClientCreate = jest.fn().mockReturnValue({
    getReports: mockGetReports,
    downloadDocument: mockDownloadDocument,
    validateQuery: mockValidateQuery,
});

const mockKafkaClientCreate = jest.fn().mockReturnValue({
    sendMessage: mockSendMessage
});

const mockCmsService = jest.fn().mockReturnValue({
    sendLinkAddress: mockSendLinkAddress,
    sendFile: mockSendFile,
});

jest.mock("clients/cma-api-client", () => ({
    CmaGovApiClient: mockCmaGovApiClientCreate
}));

jest.mock("clients/kafka-client", () => ({
    KafkaClient: mockKafkaClientCreate
}));

jest.mock("services/cms-services", () => ({
    CmsService: mockCmsService
}));

import {downloadReports} from "services/reports-service";
import { ReportQuery } from "types/report-query";
import waitForExpect from "wait-for-expect";

describe("Testing the reports service", () => {

    afterEach(() => jest.resetAllMocks());
    afterAll(() => jest.restoreAllMocks());

    it('Happy flow: testing downloading reports without any issues', async () => {

        const reportQuery: ReportQuery = {
            SystemField: "1",
            ToYearPeriod: {Quarter: "101", Year: 2020},
            ReportType: "1",
            FromYearPeriod: {Quarter: "101", Year: 2020},
        };

        mockDownloadDocument.mockResolvedValue('pizza');

        mockGetReports.mockReturnValue([
            {DocumentId: '🍕'},
            {DocumentId: '🤷‍'},
            {DocumentId: '🤘‍'}
        ]);

        const collectedLinks: DownloadLinks = await downloadReports(reportQuery);
        expect(mockValidateQuery).toBeCalledWith(reportQuery);
        expect(mockGetReports).toBeCalledWith({
            SystemField: '1',
            ToYearPeriod: { Quarter: '101', Year: 2020 },
            ReportType: '1',
            FromYearPeriod: { Quarter: '101', Year: 2020 }
        });

        await waitForExpect(() => {
            expect(mockDownloadDocument).toBeCalledTimes(3);
        });
        await waitForExpect(() => {
            expect(mockSendLinkAddress).toBeCalledTimes(3);
        });
        await waitForExpect(() => {
            expect(mockSendFile).toBeCalledTimes(3);
        });

        expect(collectedLinks.links[0]).toBe('Amount of collected files: 3');
    })

    it('Bad flow: Verify we catch an exception during the links collection', async () => {
        const reportQuery: ReportQuery = {
            SystemField: "1",
            ToYearPeriod: {Quarter: "101", Year: 2020},
            ReportType: "1",
            FromYearPeriod: {Quarter: "101", Year: 2020},
        };

        mockGetReports.mockImplementationOnce(() => {
            throw new Error('🙄');
        });

        const collectedLinks: DownloadLinks = await downloadReports(reportQuery);
        expect(mockValidateQuery).toBeCalledWith(reportQuery);
        expect(mockValidateQuery).toBeCalled();
        expect(collectedLinks.links).toStrictEqual([]);
    });

    it('Checking the validation returns any data in the response', async () => {
        const reportQuery: ReportQuery = {
            SystemField: "1",
            ToYearPeriod: {Quarter: "101", Year: 2020},
            ReportType: "1",
            FromYearPeriod: {Quarter: "101", Year: 2020},
        };

        mockGetReports.mockImplementationOnce(() => {
            throw new Error('🙄');
        });

        mockValidateQuery.mockReturnValueOnce({SystemField: "'🤘' is not allowed"})

        const collectedLinks: DownloadLinks = await downloadReports(reportQuery);
        expect(mockValidateQuery).toBeCalledWith(reportQuery);
        expect(collectedLinks).toStrictEqual({ links: [], errors: {SystemField: "'🤘' is not allowed"} });
    });

});
