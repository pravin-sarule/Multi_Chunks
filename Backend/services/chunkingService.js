

// const { RecursiveCharacterTextSplitter } = require('@langchain/textsplitters');

// async function chunkDocument(structuredContent, documentId, method = 'recursive', chunkSize = 4000, chunkOverlap = 400) {
//   let chunks = [];

//   // Helper function to add metadata and calculate token count
//   const formatChunk = (content, metadata) => ({
//     content,
//     metadata: {
//       ...metadata,
//       document_id: documentId,
//     },
//     token_count: content.length, // Simple character count as token count
//   });

//   switch (method) {
//     case 'fixed_size':
//       chunks = await fixed_sizeChunker(structuredContent, chunkSize, chunkOverlap, formatChunk);
//       break;
//     case 'recursive':
//       chunks = await recursiveChunker(structuredContent, chunkSize, chunkOverlap, formatChunk);
//       break;
//     case 'structural':
//       chunks = await structuralChunker(structuredContent, formatChunk);
//       break;
//     case 'semantic':
//       chunks = await semanticChunker(structuredContent, chunkSize, chunkOverlap, formatChunk);
//       break;
//     case 'agentic':
//       chunks = await agenticChunker(structuredContent, chunkSize, chunkOverlap, formatChunk);
//       break;
//     default:
//       console.warn(`Unknown chunking method: ${method}. Falling back to recursive.`);
//       chunks = await recursiveChunker(structuredContent, chunkSize, chunkOverlap, formatChunk);
//       break;
//   }

//   return chunks;
// }

// /**
//  * Chunks text using LangChain's RecursiveCharacterTextSplitter.
//  * This method attempts to preserve the structure of the document by splitting on different delimiters.
//  * @param {Array<Object>} structuredContent - Array of content blocks with text, page_start, page_end, heading.
//  * @param {number} chunkSize - The maximum size of each chunk.
//  * @param {number} chunkOverlap - The number of characters to overlap between chunks.
//  * @param {Function} formatChunk - Helper function to format the chunk output.
//  * @returns {Array<Object>} An array of chunk objects.
//  */
// async function recursiveChunker(structuredContent, chunkSize, chunkOverlap, formatChunk) {
//   const splitter = new RecursiveCharacterTextSplitter({
//     chunkSize,
//     chunkOverlap,
//   });

//   const allChunks = [];

//   for (const contentBlock of structuredContent) {
//     const { text, page_start, page_end, heading } = contentBlock;

//     if (!text || text.trim() === '') {
//       continue; // Skip empty text blocks
//     }

//     const output = await splitter.createDocuments([text]);

//     output.forEach(doc => {
//       allChunks.push(formatChunk(doc.pageContent, {
//         page_start: page_start,
//         page_end: page_end,
//         heading: heading,
//         ...doc.metadata, // Preserve any metadata from the splitter
//       }));
//     });
//   }
//   return allChunks;
// }

// /**
//  * Chunks text into fixed-size pieces with a specified overlap.
//  * This method is straightforward and does not consider document structure.
//  * @param {Array<Object>} structuredContent - Array of content blocks with text, page_start, page_end, heading.
//  * @param {number} chunkSize - The maximum size of each chunk.
//  * @param {number} chunkOverlap - The number of characters to overlap between chunks.
//  * @param {Function} formatChunk - Helper function to format the chunk output.
//  * @returns {Array<Object>} An array of chunk objects.
//  */
// async function fixed_sizeChunker(structuredContent, chunkSize, chunkOverlap, formatChunk) {
//   const allChunks = [];

//   for (const contentBlock of structuredContent) {
//     const { text, page_start, page_end, heading } = contentBlock;

//     if (!text || text.trim() === '') {
//       continue;
//     }

//     let currentPosition = 0;
//     while (currentPosition < text.length) {
//       const endPosition = Math.min(currentPosition + chunkSize, text.length);
//       const chunkContent = text.substring(currentPosition, endPosition);

//       allChunks.push(formatChunk(chunkContent, {
//         page_start: page_start,
//         page_end: page_end,
//         heading: heading,
//       }));

//       currentPosition += (chunkSize - chunkOverlap);
//       if (chunkSize - chunkOverlap <= 0) { // Prevent infinite loop if overlap is too large
//         currentPosition++;
//       }
//     }
//   }
//   return allChunks;
// }

// /**
//  * Placeholder for structural chunking.
//  * This method would typically analyze document elements like headings, sections, and page breaks.
//  * @param {Array<Object>} structuredContent - Array of content blocks with text, page_start, page_end, heading.
//  * @param {Function} formatChunk - Helper function to format the chunk output.
//  * @returns {Array<Object>} An array of chunk objects.
//  */
// async function structuralChunker(structuredContent, formatChunk) {
//   const allChunks = [];

//   for (const contentBlock of structuredContent) {
//     const { text, page_start, page_end, heading } = contentBlock;

//     if (!text || text.trim() === '') {
//       continue;
//     }

//     // For structural chunking, we can initially treat each content block as a chunk.
//     // Further refinement could involve splitting large blocks based on internal structure (e.g., paragraphs, lists)
//     // or combining smaller blocks if they semantically belong together under the same heading/section.
//     // For this implementation, we'll consider each `contentBlock` as a structural unit.
//     allChunks.push(formatChunk(text, {
//       page_start: page_start,
//       page_end: page_end,
//       heading: heading,
//     }));
//   }
//   return allChunks;
// }

// /**
//  * Placeholder for semantic chunking.
//  * This method would typically use NLP techniques to split text based on semantic meaning.
//  * Falls back to recursive chunking if semantic analysis is not feasible or implemented.
//  * @param {Array<Object>} structuredContent - Array of content blocks with text, page_start, page_end, heading.
//  * @param {number} chunkSize - The maximum size of each chunk for fallback.
//  * @param {number} chunkOverlap - The number of characters to overlap for fallback.
//  * @param {Function} formatChunk - Helper function to format the chunk output.
//  * @returns {Array<Object>} An array of chunk objects.
//  */
// async function semanticChunker(structuredContent, chunkSize, chunkOverlap, formatChunk) {
//   // For now, semantic chunking will fall back to recursive chunking.
//   // In a full implementation, this would involve more advanced NLP techniques
//   // to identify semantically meaningful boundaries in the text.
//   console.warn("Semantic chunking not fully implemented. Falling back to recursive chunking.");
//   return recursiveChunker(structuredContent, chunkSize, chunkOverlap, formatChunk);
// }

// /**
//  * Placeholder for agentic chunking.
//  * This method would use an intelligent agent to detect and split various document elements.
//  * @param {Array<Object>} structuredContent - Array of content blocks with text, page_start, page_end, heading.
//  * @param {Function} formatChunk - Helper function to format the chunk output.
//  * @returns {Array<Object>} An array of chunk objects.
//  */
// async function agenticChunker(structuredContent, formatChunk) {
//   const allChunks = [];
//   // For agentic chunking, we use a RecursiveCharacterTextSplitter with specific separators
//   // to intelligently split text based on common document structures like paragraphs.
//   // This allows for more meaningful chunks for LLMs by trying to keep related text together.
//   const agenticSplitter = new RecursiveCharacterTextSplitter({
//     chunkSize,
//     chunkOverlap,
//     separators: ["\n\n", "\n", " ", ""], // Prioritize splitting by paragraphs, then lines, then words
//   });

//   for (const contentBlock of structuredContent) {
//     const { text, page_start, page_end, heading } = contentBlock;

//     if (!text || text.trim() === '') {
//       continue;
//     }

//     // If the structuredContent provided explicit types (e.g., 'table', 'paragraph'),
//     // we would add logic here to handle them differently.
//     // For example, tables might be kept as single chunks or processed specially.
//     // For now, we apply the agentic splitter to all text content.
//     const output = await agenticSplitter.createDocuments([text]);

//     output.forEach(doc => {
//       allChunks.push(formatChunk(doc.pageContent, {
//         page_start: page_start,
//         page_end: page_end,
//         heading: heading,
//         ...doc.metadata, // Preserve any metadata from the splitter
//       }));
//     });
//   }
//   return allChunks;
// }

// module.exports = {
//   chunkDocument,
//   recursiveChunker,
//   fixed_sizeChunker,
//   structuralChunker,
//   semanticChunker,
//   agenticChunker,
// };



const { RecursiveCharacterTextSplitter } = require('@langchain/textsplitters');

/**
 * Main chunking function that routes to appropriate chunking method
 * @param {Array<Object>} structuredContent - Array of content blocks with text, page_start, page_end, heading
 * @param {string} documentId - Unique identifier for the document
 * @param {string} method - Chunking method: 'fixed_size', 'recursive', 'structural', 'semantic', 'agentic'
 * @param {number} chunkSize - Maximum size of each chunk (default: 4000)
 * @param {number} chunkOverlap - Number of characters to overlap between chunks (default: 400)
 * @returns {Array<Object>} Array of chunk objects with content, metadata, and token_count
 */
async function chunkDocument(
  structuredContent,
  documentId,
  method = 'recursive',
  chunkSize = 4000,
  chunkOverlap = 400
) {
  // Validate input
  if (!structuredContent || !Array.isArray(structuredContent) || structuredContent.length === 0) {
    console.warn('Empty or invalid structured content provided.');
    return [];
  }

  // Helper function to format chunks with metadata
  const formatChunk = (content, metadata) => ({
    content,
    metadata: {
      ...metadata,
      document_id: documentId,
    },
    token_count: estimateTokenCount(content),
  });

  let chunks = [];

  // Route to appropriate chunking method
  switch (method) {
    case 'fixed_size':
      chunks = await fixedSizeChunker(structuredContent, chunkSize, chunkOverlap, formatChunk);
      break;
    case 'recursive':
      chunks = await recursiveChunker(structuredContent, chunkSize, chunkOverlap, formatChunk);
      break;
    case 'structural':
      chunks = await structuralChunker(structuredContent, formatChunk);
      break;
    case 'semantic':
      chunks = await semanticChunker(structuredContent, chunkSize, chunkOverlap, formatChunk);
      break;
    case 'agentic':
      chunks = await agenticChunker(structuredContent, chunkSize, chunkOverlap, formatChunk);
      break;
    default:
      console.warn(`Unknown chunking method: ${method}. Falling back to recursive.`);
      chunks = await recursiveChunker(structuredContent, chunkSize, chunkOverlap, formatChunk);
      break;
  }

  console.log(`Chunked document ${documentId} using ${method} method: ${chunks.length} chunks created.`);
  return chunks;
}

/**
 * Estimate token count (more accurate than simple character count)
 * Rough estimation: 1 token ≈ 4 characters for English text
 */
function estimateTokenCount(text) {
  if (!text) return 0;
  return Math.ceil(text.length / 4);
}

/**
 * FIXED SIZE CHUNKING
 * Splits text into fixed-size pieces with overlap
 * Best for: Simple documents without complex structure
 */
async function fixedSizeChunker(structuredContent, chunkSize, chunkOverlap, formatChunk) {
  const allChunks = [];

  for (const contentBlock of structuredContent) {
    const { text, page_start, page_end, heading } = contentBlock;

    if (!text || text.trim() === '') {
      continue;
    }

    let currentPosition = 0;
    const step = Math.max(1, chunkSize - chunkOverlap); // Prevent infinite loop

    while (currentPosition < text.length) {
      const endPosition = Math.min(currentPosition + chunkSize, text.length);
      const chunkContent = text.substring(currentPosition, endPosition);

      allChunks.push(
        formatChunk(chunkContent, {
          page_start,
          page_end,
          heading,
          chunk_method: 'fixed_size',
        })
      );

      currentPosition += step;
    }
  }

  return allChunks;
}

/**
 * RECURSIVE CHUNKING
 * Uses LangChain's RecursiveCharacterTextSplitter
 * Preserves structure by splitting on different delimiters hierarchically
 * Best for: General purpose, maintains some document structure
 */
async function recursiveChunker(structuredContent, chunkSize, chunkOverlap, formatChunk) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize,
    chunkOverlap,
    separators: ['\n\n', '\n', '. ', ' ', ''], // Split by paragraphs, lines, sentences, words
  });

  const allChunks = [];

  for (const contentBlock of structuredContent) {
    const { text, page_start, page_end, heading } = contentBlock;

    if (!text || text.trim() === '') {
      continue;
    }

    const output = await splitter.createDocuments([text]);

    output.forEach((doc) => {
      allChunks.push(
        formatChunk(doc.pageContent, {
          page_start,
          page_end,
          heading,
          chunk_method: 'recursive',
          ...doc.metadata,
        })
      );
    });
  }

  return allChunks;
}

/**
 * STRUCTURAL CHUNKING
 * Splits based on document structure: headings, sections, page breaks
 * Best for: Well-structured documents with clear hierarchies
 */
async function structuralChunker(structuredContent, formatChunk) {
  const allChunks = [];

  for (const contentBlock of structuredContent) {
    const { text, page_start, page_end, heading } = contentBlock;

    if (!text || text.trim() === '') {
      continue;
    }

    // Split by structural elements
    const structuralSections = splitByStructuralElements(text);

    structuralSections.forEach((section) => {
      if (section.content.trim().length > 0) {
        allChunks.push(
          formatChunk(section.content, {
            page_start,
            page_end,
            heading: section.heading || heading,
            section_type: section.type,
            chunk_method: 'structural',
          })
        );
      }
    });
  }

  return allChunks;
}

/**
 * Helper function to identify and split by structural elements
 */
function splitByStructuralElements(text) {
  const sections = [];
  const lines = text.split('\n');
  let currentSection = { content: '', heading: null, type: 'paragraph' };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect headings (various formats)
    if (isHeading(line)) {
      // Save previous section
      if (currentSection.content.trim()) {
        sections.push({ ...currentSection });
      }
      // Start new section with heading
      currentSection = {
        content: line + '\n',
        heading: line.trim(),
        type: 'section',
      };
    } else if (line.trim() === '') {
      // Empty line - might indicate section break
      if (currentSection.content.trim()) {
        currentSection.content += line + '\n';
      }
    } else {
      currentSection.content += line + '\n';
    }
  }

  // Add final section
  if (currentSection.content.trim()) {
    sections.push(currentSection);
  }

  return sections;
}

/**
 * Detect if a line is a heading
 */
function isHeading(line) {
  const trimmed = line.trim();
  
  // Check for common heading patterns in legal documents
  const headingPatterns = [
    /^[A-Z][A-Z\s]{3,}$/, // ALL CAPS (minimum 4 chars)
    /^(?:SECTION|ARTICLE|CHAPTER|PART)\s+\d+/i, // SECTION 1, ARTICLE II, etc.
    /^\d+\.\s+[A-Z]/, // 1. Heading
    /^[IVXLCDM]+\.\s+/, // Roman numerals: I. II. III.
    /^#{1,6}\s+/, // Markdown style headings
  ];

  return headingPatterns.some((pattern) => pattern.test(trimmed));
}

/**
 * SEMANTIC CHUNKING
 * Splits based on semantic meaning and context
 * Currently falls back to enhanced recursive chunking
 * Best for: Documents where meaning and context matter most
 */
async function semanticChunker(structuredContent, chunkSize, chunkOverlap, formatChunk) {
  console.log('Semantic chunking: using enhanced recursive approach with semantic separators.');
  
  // Use semantic-aware separators
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize,
    chunkOverlap,
    separators: [
      '\n\n\n', // Multiple line breaks (strong semantic boundary)
      '\n\n', // Paragraph breaks
      '.\n', // Sentence ending with new line
      '. ', // Sentence endings
      ';\n', // Clause endings with new line
      '; ', // Clause endings
      ',\n', // List items with new line
      '\n', // Line breaks
      ' ', // Words
      '', // Characters
    ],
  });

  const allChunks = [];

  for (const contentBlock of structuredContent) {
    const { text, page_start, page_end, heading } = contentBlock;

    if (!text || text.trim() === '') {
      continue;
    }

    const output = await splitter.createDocuments([text]);

    output.forEach((doc) => {
      allChunks.push(
        formatChunk(doc.pageContent, {
          page_start,
          page_end,
          heading,
          chunk_method: 'semantic',
          ...doc.metadata,
        })
      );
    });
  }

  return allChunks;
}

/**
 * AGENTIC CHUNKING
 * Intelligent splitting: detects and preserves meaningful units
 * - Paragraphs as single chunks
 * - Tables as single chunks
 * - Numbered clauses as separate chunks
 * - Bullet points grouped intelligently
 * - Headings kept with their content
 * Best for: Legal documents, contracts, complex structured documents
 */
async function agenticChunker(structuredContent, chunkSize, chunkOverlap, formatChunk) {
  const allChunks = [];

  for (const contentBlock of structuredContent) {
    const { text, page_start, page_end, heading } = contentBlock;

    if (!text || text.trim() === '') {
      continue;
    }

    // Parse text into intelligent units
    const intelligentUnits = parseIntelligentUnits(text, chunkSize);

    intelligentUnits.forEach((unit) => {
      allChunks.push(
        formatChunk(unit.content, {
          page_start,
          page_end,
          heading: unit.heading || heading,
          unit_type: unit.type,
          chunk_method: 'agentic',
        })
      );
    });
  }

  return allChunks;
}

/**
 * Parse text into intelligent units for agentic chunking
 */
function parseIntelligentUnits(text, maxSize) {
  const units = [];
  const lines = text.split('\n');
  let currentUnit = { content: '', type: 'paragraph', heading: null };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip empty lines unless they're section breaks
    if (trimmed === '') {
      if (currentUnit.content.trim()) {
        currentUnit.content += '\n';
      }
      continue;
    }

    // Detect unit type
    const lineType = detectLineType(line);

    // Handle tables - keep as single unit
    if (lineType === 'table' || currentUnit.type === 'table') {
      if (currentUnit.type !== 'table') {
        // Save previous unit and start table
        if (currentUnit.content.trim()) {
          units.push({ ...currentUnit });
        }
        currentUnit = { content: line + '\n', type: 'table', heading: null };
      } else {
        currentUnit.content += line + '\n';
        // Check if table ended
        if (!isTableLine(lines[i + 1])) {
          units.push({ ...currentUnit });
          currentUnit = { content: '', type: 'paragraph', heading: null };
        }
      }
      continue;
    }

    // Handle headings
    if (lineType === 'heading') {
      if (currentUnit.content.trim()) {
        units.push({ ...currentUnit });
      }
      currentUnit = {
        content: line + '\n',
        type: 'section',
        heading: trimmed,
      };
      continue;
    }

    // Handle numbered clauses (legal documents)
    if (lineType === 'numbered_clause') {
      if (currentUnit.content.trim() && currentUnit.type !== 'numbered_clause') {
        units.push({ ...currentUnit });
        currentUnit = { content: '', type: 'numbered_clause', heading: null };
      }
      currentUnit.content += line + '\n';
      
      // Check if this clause is complete (next line is new clause or different type)
      const nextLineType = i + 1 < lines.length ? detectLineType(lines[i + 1]) : null;
      if (nextLineType !== 'continuation' && nextLineType !== null) {
        if (currentUnit.content.length < maxSize * 0.8) {
          units.push({ ...currentUnit });
          currentUnit = { content: '', type: 'paragraph', heading: null };
        }
      }
      continue;
    }

    // Handle bullet points
    if (lineType === 'bullet_point') {
      if (currentUnit.type !== 'bullet_list') {
        if (currentUnit.content.trim()) {
          units.push({ ...currentUnit });
        }
        currentUnit = { content: '', type: 'bullet_list', heading: null };
      }
      currentUnit.content += line + '\n';
      continue;
    }

    // Regular paragraph text
    currentUnit.content += line + '\n';

    // Split if unit becomes too large
    if (currentUnit.content.length > maxSize) {
      const splitUnits = splitLargeUnit(currentUnit.content, maxSize, currentUnit.type);
      splitUnits.forEach((splitContent) => {
        units.push({
          content: splitContent,
          type: currentUnit.type,
          heading: currentUnit.heading,
        });
      });
      currentUnit = { content: '', type: 'paragraph', heading: null };
    }
  }

  // Add final unit
  if (currentUnit.content.trim()) {
    units.push(currentUnit);
  }

  return units;
}

/**
 * Detect the type of a line
 */
function detectLineType(line) {
  if (!line) return null;
  
  const trimmed = line.trim();

  // Table detection (simple heuristic - contains multiple pipes or tabs)
  if (trimmed.includes('|') || (trimmed.match(/\t/g) || []).length > 2) {
    return 'table';
  }

  // Heading detection
  if (isHeading(trimmed)) {
    return 'heading';
  }

  // Numbered clause (legal style): 1.1, 2.3.4, (a), (i), etc.
  if (/^(?:\d+\.)+\d*\s+|^\([a-z0-9]+\)\s+|^[a-z]\)\s+/i.test(trimmed)) {
    return 'numbered_clause';
  }

  // Bullet points
  if (/^[-•*]\s+|^[►▪▸]\s+/.test(trimmed)) {
    return 'bullet_point';
  }

  // Continuation of previous element
  if (trimmed.length > 0 && !/^[A-Z0-9]/.test(trimmed)) {
    return 'continuation';
  }

  return 'paragraph';
}

/**
 * Check if a line is part of a table
 */
function isTableLine(line) {
  if (!line) return false;
  const trimmed = line.trim();
  return trimmed.includes('|') || trimmed.match(/\t{2,}/) || trimmed.match(/\s{4,}/);
}

/**
 * Split a large unit into smaller chunks while preserving meaning
 */
function splitLargeUnit(content, maxSize, unitType) {
  const chunks = [];
  
  // For tables, don't split - return as is even if large
  if (unitType === 'table') {
    return [content];
  }

  // Split by sentences for paragraphs
  const sentences = content.match(/[^.!?]+[.!?]+/g) || [content];
  let currentChunk = '';

  for (const sentence of sentences) {
    if ((currentChunk + sentence).length > maxSize && currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
      currentChunk = sentence;
    } else {
      currentChunk += sentence;
    }
  }

  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

module.exports = {
  chunkDocument,
  fixedSizeChunker,
  recursiveChunker,
  structuralChunker,
  semanticChunker,
  agenticChunker,
};