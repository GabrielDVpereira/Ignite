import { Stack, Text, Box } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const siblignsCount = 1

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => from + index + 1)
    .filter(page => page > 0)
}


export function Pagination({
  totalCountOfRegisters,
  registersPerPage = 10,
  currentPage = 1,
  onPageChange
}: PaginationProps) {
  const lastPage = Math.floor(totalCountOfRegisters / registersPerPage);

  const previousPages = currentPage > 1
    ? generatePagesArray(currentPage - 1 - siblignsCount, currentPage - 1)
    : []

  const nextPages = currentPage < lastPage
    ? generatePagesArray(currentPage, Math.min(currentPage + siblignsCount, lastPage))
    : []

  return (
    <Stack
      direction={["column", "row"]}
      mt="8"
      justify="space-between"
      align="center"
      spacing="6"
    >
      <Box>
        <strong>0</strong> - <strong>0</strong> de <strong>100</strong>
      </Box>

      <Stack direction="row" spacing="2">

        {currentPage > (1 + siblignsCount) && (
          <>
            <PaginationItem pageNumber={1} />
            {currentPage > (2 + siblignsCount) && 
              (<Text color="gray.300" width="8" textAlign="center">...</Text>)}
          </>
        )}

        {previousPages.length > 0 && previousPages.map(page => <PaginationItem key={page} pageNumber={page} />)}
        <PaginationItem pageNumber={currentPage} isCurrent />
        {nextPages.length > 0 && nextPages.map(page => <PaginationItem key={page} pageNumber={page} />)}


        {(1 + siblignsCount) < lastPage && (
          <>
            {(currentPage + 1 + siblignsCount) < lastPage && 
              (<Text color="gray.300" width="8" textAlign="center">...</Text>)}
            <PaginationItem pageNumber={lastPage} />
          </>
        )}
      </Stack>
    </Stack>
  );
}
