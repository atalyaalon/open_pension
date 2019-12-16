import { isDev } from "services/config-service";
import ReportQuery from "types/report-query";
import DownloadLinks from "types/download-links";
import ReportRow from "types/report-row";
import CmaGovApiClient from "clients/cma-api-client";
import { uploadFile } from "clients/google-storage-client";
const cmaClient = new CmaGovApiClient();

export async function downloadReports(query: ReportQuery): Promise<DownloadLinks> {
  try {
    const reports = await cmaClient.getReports(query);
    const links = await Promise.all(
      reports
        .slice(0, 1) // only taking 1 row for testing
        .map(async row => {
          const localFile = await cmaClient.downloadDocument(row);
          if (isDev()) {
            return `file://${localFile}`;
          }

          return uploadFile(localFile);
        })
    );
    return { links };
  } catch (error) {
    console.error(error);
    return { links: [] };
  }
}
