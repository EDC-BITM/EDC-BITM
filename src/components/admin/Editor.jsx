import { useEffect, useState, useCallback, useRef } from "react";

import {
  $getRoot,
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  $createParagraphNode,
  $insertNodes,
  $getNodeByKey,
} from "lexical";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";

import {
  HeadingNode,
  QuoteNode,
  $createHeadingNode,
  $createQuoteNode,
} from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { CodeNode, CodeHighlightNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";

import {
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";

import { TOGGLE_LINK_COMMAND } from "@lexical/link";

import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Quote,
  Undo,
  Redo,
  Image as ImageIcon,
  Link as LinkIcon,
  Maximize2,
  Minimize2,
  Youtube,
  Twitter,
  Minus,
  Save,
  Download,
  Upload,
  Trash2,
} from "lucide-react";

import { DecoratorNode, $applyNodeReplacement } from "lexical";

import {
  saveEditorContent,
  loadEditorContent,
  clearEditorContent,
  exportEditorContent,
  importEditorContent,
  createAutoSave,
} from "../../otherpages/admin/editorUtils";

// Resizable Image Component
function ResizableImage({
  src,
  altText,
  width,
  height,
  nodeKey,
  alignment = "center",
}) {
  const [imgWidth, setImgWidth] = useState(width);
  const [isResizing, setIsResizing] = useState(false);
  const [currentWidth, setCurrentWidth] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [imageAlign, setImageAlign] = useState(alignment);
  const imgRef = useRef(null);
  const [editor] = useLexicalComposerContext();

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsResizing(true);
    const startX = e.clientX;
    const startWidth = imgRef.current.offsetWidth;
    let finalWidth = `${startWidth}px`;

    const handleMouseMove = (e) => {
      const newWidth = Math.max(
        100,
        Math.min(1200, startWidth + (e.clientX - startX))
      );
      finalWidth = `${newWidth}px`;
      setImgWidth(finalWidth);
      setCurrentWidth(Math.round(newWidth));
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);

      // Update the node with new width
      editor.update(() => {
        const node = $getNodeByKey(nodeKey);
        if (node) {
          const writable = node.getWritable();
          writable.__width = finalWidth;
        }
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleAlignmentChange = (align) => {
    setImageAlign(align);
    editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      if (node) {
        const writable = node.getWritable();
        writable.__alignment = align;
      }
    });
  };

  const getJustifyContent = () => {
    switch (imageAlign) {
      case "left":
        return "flex-start";
      case "right":
        return "flex-end";
      default:
        return "center";
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: getJustifyContent(),
        width: "100%",
        margin: "1rem 0",
      }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => !isResizing && setShowControls(false)}
    >
      <div
        style={{
          position: "relative",
          display: "inline-block",
          maxWidth: "100%",
        }}
      >
        {/* Alignment Controls */}
        {showControls && (
          <div
            style={{
              position: "absolute",
              top: "-40px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "4px",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              padding: "6px 8px",
              borderRadius: "8px",
              zIndex: 10,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
            }}
          >
            <button
              onClick={() => handleAlignmentChange("left")}
              style={{
                padding: "6px",
                background: imageAlign === "left" ? "#3b82f6" : "transparent",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                color: "white",
                display: "flex",
                alignItems: "center",
                transition: "background 0.2s",
              }}
              title="Align Left"
            >
              <AlignLeft size={16} />
            </button>
            <button
              onClick={() => handleAlignmentChange("center")}
              style={{
                padding: "6px",
                background: imageAlign === "center" ? "#3b82f6" : "transparent",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                color: "white",
                display: "flex",
                alignItems: "center",
                transition: "background 0.2s",
              }}
              title="Align Center"
            >
              <AlignCenter size={16} />
            </button>
            <button
              onClick={() => handleAlignmentChange("right")}
              style={{
                padding: "6px",
                background: imageAlign === "right" ? "#3b82f6" : "transparent",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                color: "white",
                display: "flex",
                alignItems: "center",
                transition: "background 0.2s",
              }}
              title="Align Right"
            >
              <AlignRight size={16} />
            </button>
          </div>
        )}

        <img
          ref={imgRef}
          src={src}
          alt={altText}
          style={{
            width: imgWidth,
            height: "auto",
            borderRadius: "0.5rem",
            boxShadow: isResizing
              ? "0 8px 24px rgba(59, 130, 246, 0.4), 0 0 0 3px rgba(59, 130, 246, 0.5)"
              : showControls
              ? "0 4px 12px rgba(0, 0, 0, 0.15), 0 0 0 2px rgba(59, 130, 246, 0.3)"
              : "0 4px 6px rgba(0, 0, 0, 0.1)",
            display: "block",
            cursor: isResizing ? "ew-resize" : "default",
            transition: isResizing ? "none" : "box-shadow 0.2s ease",
          }}
        />

        {/* Width Display Feedback */}
        {isResizing && (
          <div
            style={{
              position: "absolute",
              bottom: "-35px",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "rgba(59, 130, 246, 0.95)",
              color: "white",
              padding: "6px 12px",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "600",
              whiteSpace: "nowrap",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
              zIndex: 10,
              pointerEvents: "none",
            }}
          >
            {currentWidth}px
          </div>
        )}

        {/* Resize handles */}
        {showControls && (
          <>
            <div
              onMouseDown={handleMouseDown}
              style={{
                position: "absolute",
                right: "-8px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "16px",
                height: "60px",
                backgroundColor: "#3b82f6",
                borderRadius: "8px",
                cursor: "ew-resize",
                opacity: isResizing ? 1 : 0.8,
                transition: "all 0.2s ease",
                boxShadow: "0 2px 8px rgba(59, 130, 246, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => {
                if (!isResizing) {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.width = "18px";
                  e.currentTarget.style.height = "70px";
                }
              }}
              onMouseLeave={(e) => {
                if (!isResizing) {
                  e.currentTarget.style.opacity = "0.8";
                  e.currentTarget.style.width = "16px";
                  e.currentTarget.style.height = "60px";
                }
              }}
            >
              <div
                style={{
                  width: "3px",
                  height: "20px",
                  backgroundColor: "white",
                  borderRadius: "2px",
                  marginRight: "2px",
                }}
              />
              <div
                style={{
                  width: "3px",
                  height: "20px",
                  backgroundColor: "white",
                  borderRadius: "2px",
                }}
              />
            </div>
            <div
              onMouseDown={handleMouseDown}
              style={{
                position: "absolute",
                left: "-8px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "16px",
                height: "60px",
                backgroundColor: "#3b82f6",
                borderRadius: "8px",
                cursor: "ew-resize",
                opacity: isResizing ? 1 : 0.8,
                transition: "all 0.2s ease",
                boxShadow: "0 2px 8px rgba(59, 130, 246, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => {
                if (!isResizing) {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.width = "18px";
                  e.currentTarget.style.height = "70px";
                }
              }}
              onMouseLeave={(e) => {
                if (!isResizing) {
                  e.currentTarget.style.opacity = "0.8";
                  e.currentTarget.style.width = "16px";
                  e.currentTarget.style.height = "60px";
                }
              }}
            >
              <div
                style={{
                  width: "3px",
                  height: "20px",
                  backgroundColor: "white",
                  borderRadius: "2px",
                  marginRight: "2px",
                }}
              />
              <div
                style={{
                  width: "3px",
                  height: "20px",
                  backgroundColor: "white",
                  borderRadius: "2px",
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Custom Image Node
class ImageNode extends DecoratorNode {
  __src;
  __altText;
  __width;
  __height;
  __alignment;

  static getType() {
    return "image";
  }

  static clone(node) {
    return new ImageNode(
      node.__src,
      node.__altText,
      node.__width,
      node.__height,
      node.__alignment,
      node.__key
    );
  }

  static importJSON(serializedNode) {
    const { src, altText, width, height, alignment } = serializedNode;
    return $createImageNode({
      src,
      altText,
      maxWidth: width,
      maxHeight: height,
      alignment: alignment || "center",
    });
  }

  exportJSON() {
    return {
      src: this.__src,
      altText: this.__altText,
      width: this.__width,
      height: this.__height,
      alignment: this.__alignment,
      type: "image",
      version: 1,
    };
  }

  constructor(
    src = "",
    altText = "",
    width = "600px",
    height = "auto",
    alignment = "center",
    key
  ) {
    super(key);
    this.__src = src;
    this.__altText = altText;
    this.__width = width;
    this.__height = height;
    this.__alignment = alignment;
  }

  createDOM() {
    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.justifyContent = "center";
    div.style.margin = "1rem 0";
    div.style.width = "100%";
    return div;
  }

  updateDOM() {
    return false;
  }

  decorate() {
    return (
      <ResizableImage
        src={this.__src}
        altText={this.__altText}
        width={this.__width}
        height={this.__height}
        alignment={this.__alignment}
        nodeKey={this.__key}
      />
    );
  }
}

function $createImageNode({
  src,
  altText,
  maxWidth,
  maxHeight,
  alignment = "center",
}) {
  return $applyNodeReplacement(
    new ImageNode(src, altText, maxWidth, maxHeight, alignment)
  );
}

// YouTube Component
function YouTubeEmbed({ url }) {
  const getVideoId = (url) => {
    // Handle various YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=)([^&\s]+)/,
      /(?:youtu\.be\/)([^&\s]+)/,
      /(?:youtube\.com\/embed\/)([^&\s]+)/,
      /^([a-zA-Z0-9_-]{11})$/, // Direct video ID
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return url;
  };

  const videoId = getVideoId(url);

  return (
    <div
      style={{
        position: "relative",
        paddingBottom: "56.25%",
        height: 0,
        overflow: "hidden",
        borderRadius: "0.5rem",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        margin: "1.5rem 0",
      }}
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: 0,
        }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        title="YouTube video"
      />
    </div>
  );
}

// YouTube Embed Node
class YouTubeNode extends DecoratorNode {
  __url;

  static getType() {
    return "youtube";
  }

  static clone(node) {
    return new YouTubeNode(node.__url, node.__key);
  }

  static importJSON(serializedNode) {
    return $createYouTubeNode(serializedNode.url);
  }

  exportJSON() {
    return {
      url: this.__url,
      type: "youtube",
      version: 1,
    };
  }

  constructor(url = "", key) {
    super(key);
    this.__url = url;
  }

  createDOM() {
    const div = document.createElement("div");
    div.style.margin = "1.5rem 0";
    return div;
  }

  updateDOM() {
    return false;
  }

  decorate() {
    return <YouTubeEmbed url={this.__url} />;
  }
}

function $createYouTubeNode(url) {
  return $applyNodeReplacement(new YouTubeNode(url));
}

// Tweet Component
function TweetEmbed({ tweetId }) {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load Twitter widget script if not already loaded
    if (!window.twttr) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.onload = () => setIsLoaded(true);
      document.body.appendChild(script);
    } else {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && window.twttr && containerRef.current) {
      // Clear previous content
      containerRef.current.innerHTML = "";

      // Create tweet embed
      window.twttr.widgets.createTweet(tweetId, containerRef.current, {
        theme: "light",
        align: "center",
      });
    }
  }, [isLoaded, tweetId]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "1.5rem 0",
        minHeight: "200px",
      }}
    >
      <div ref={containerRef} style={{ maxWidth: "550px", width: "100%" }}>
        {!isLoaded && (
          <div
            style={{
              padding: "2rem",
              textAlign: "center",
              color: "#666",
              border: "1px solid #e1e8ed",
              borderRadius: "0.5rem",
            }}
          >
            Loading tweet...
          </div>
        )}
      </div>
    </div>
  );
}

// Twitter/Tweet Embed Node
class TweetNode extends DecoratorNode {
  __tweetId;

  static getType() {
    return "tweet";
  }

  static clone(node) {
    return new TweetNode(node.__tweetId, node.__key);
  }

  static importJSON(serializedNode) {
    return $createTweetNode(serializedNode.tweetId);
  }

  exportJSON() {
    return {
      tweetId: this.__tweetId,
      type: "tweet",
      version: 1,
    };
  }

  constructor(tweetId = "", key) {
    super(key);
    this.__tweetId = tweetId;
  }

  createDOM() {
    const div = document.createElement("div");
    div.style.margin = "1.5rem 0";
    return div;
  }

  updateDOM() {
    return false;
  }

  decorate() {
    return <TweetEmbed tweetId={this.__tweetId} />;
  }
}

function $createTweetNode(tweetId) {
  return $applyNodeReplacement(new TweetNode(tweetId));
}

// Horizontal Divider Node
class DividerNode extends DecoratorNode {
  static getType() {
    return "divider";
  }

  static clone(node) {
    return new DividerNode(node.__key);
  }

  static importJSON() {
    return $createDividerNode();
  }

  exportJSON() {
    return {
      type: "divider",
      version: 1,
    };
  }

  constructor(key) {
    super(key);
  }

  createDOM() {
    const div = document.createElement("div");
    div.style.margin = "2rem 0";
    return div;
  }

  updateDOM() {
    return false;
  }

  decorate() {
    return (
      <hr
        style={{
          border: "none",
          borderTop: "2px solid #e5e7eb",
          margin: "2rem 0",
          background:
            "linear-gradient(to right, transparent, #d1d5db, transparent)",
          height: "2px",
        }}
      />
    );
  }
}

function $createDividerNode() {
  return $applyNodeReplacement(new DividerNode());
}

const theme = {
  ltr: "ltr",
  rtl: "rtl",
  paragraph: "editor-paragraph",
  quote: "editor-quote",
  heading: {
    h1: "editor-heading-h1",
    h2: "editor-heading-h2",
    h3: "editor-heading-h3",
    h4: "editor-heading-h4",
    h5: "editor-heading-h5",
    h6: "editor-heading-h6",
  },
  list: {
    nested: {
      listitem: "editor-nested-listitem",
    },
    ol: "editor-list-ol",
    ul: "editor-list-ul",
    listitem: "editor-listitem",
  },
  image: "editor-image",
  link: "editor-link",
  text: {
    bold: "editor-text-bold",
    italic: "editor-text-italic",
    underline: "editor-text-underline",
    strikethrough: "editor-text-strikethrough",
    code: "editor-text-code",
  },
  code: "editor-code",
  codeHighlight: {
    atrule: "editor-tokenAttr",
    attr: "editor-tokenAttr",
    boolean: "editor-tokenProperty",
    builtin: "editor-tokenSelector",
    cdata: "editor-tokenComment",
    char: "editor-tokenSelector",
    class: "editor-tokenFunction",
    "class-name": "editor-tokenFunction",
    comment: "editor-tokenComment",
    constant: "editor-tokenProperty",
    deleted: "editor-tokenProperty",
    doctype: "editor-tokenComment",
    entity: "editor-tokenOperator",
    function: "editor-tokenFunction",
    important: "editor-tokenVariable",
    inserted: "editor-tokenSelector",
    keyword: "editor-tokenAttr",
    namespace: "editor-tokenVariable",
    number: "editor-tokenProperty",
    operator: "editor-tokenOperator",
    prolog: "editor-tokenComment",
    property: "editor-tokenProperty",
    punctuation: "editor-tokenPunctuation",
    regex: "editor-tokenVariable",
    selector: "editor-tokenSelector",
    string: "editor-tokenSelector",
    symbol: "editor-tokenProperty",
    tag: "editor-tokenProperty",
    url: "editor-tokenOperator",
    variable: "editor-tokenVariable",
  },
};

// Toolbar Button Component
function ToolbarButton({ onClick, active, disabled, children, title }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`
        p-2 rounded-lg transition-all duration-200 ease-in-out
        hover:bg-blue-50 active:scale-95
        disabled:opacity-30 disabled:cursor-not-allowed
        ${active ? "bg-blue-100 text-blue-600 shadow-sm" : "text-gray-700"}
        ${!disabled && !active ? "hover:shadow-md" : ""}
      `}
    >
      {children}
    </button>
  );
}

// Divider Component
function ToolbarDivider() {
  return <div className="w-px h-6 bg-gray-300 mx-1" />;
}

// Toolbar Plugin
function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [activeStates, setActiveStates] = useState({
    isBold: false,
    isItalic: false,
    isUnderline: false,
    isStrikethrough: false,
    isCode: false,
  });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const fileInputRef = useRef(null);
  const importInputRef = useRef(null);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          setActiveStates({
            isBold: selection.hasFormat("bold"),
            isItalic: selection.hasFormat("italic"),
            isUnderline: selection.hasFormat("underline"),
            isStrikethrough: selection.hasFormat("strikethrough"),
            isCode: selection.hasFormat("code"),
          });
        }
      });
    });
  }, [editor]);

  const formatText = (format) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  const formatHeading = (headingSize) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const heading = $createHeadingNode(headingSize);
        selection.insertNodes([heading]);
      }
    });
  };

  const insertImage = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleImageUpload = useCallback(
    (event) => {
      const file = event.target.files?.[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target.result;
          editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              const imageNode = $createImageNode({
                src: imageUrl,
                altText: file.name,
                maxWidth: 800,
              });
              selection.insertNodes([imageNode]);
            }
          });
        };
        reader.readAsDataURL(file);
      }
    },
    [editor]
  );

  const insertLink = useCallback(() => {
    const url = prompt("Enter URL:");
    if (url) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
    }
  }, [editor]);

  const insertYouTube = useCallback(() => {
    const url = prompt("Enter YouTube URL or Video ID:");
    if (url) {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const youtubeNode = $createYouTubeNode(url);
          selection.insertNodes([youtubeNode]);
        }
      });
    }
  }, [editor]);

  const insertTweet = useCallback(() => {
    const tweetUrl = prompt(
      "Enter Tweet URL (e.g., https://twitter.com/user/status/1234567890):"
    );
    if (tweetUrl) {
      const tweetId = tweetUrl.match(/status\/(\d+)/)?.[1] || tweetUrl;
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const tweetNode = $createTweetNode(tweetId);
          selection.insertNodes([tweetNode]);
        }
      });
    }
  }, [editor]);

  const insertDivider = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const dividerNode = $createDividerNode();
        selection.insertNodes([dividerNode]);
      }
    });
  }, [editor]);

  const handleSave = useCallback(() => {
    setIsSaving(true);
    editor.getEditorState().read(() => {
      const serializedState = editor.getEditorState().toJSON();
      saveEditorContent(serializedState);
      setLastSaved(new Date());
      setTimeout(() => setIsSaving(false), 1000);
    });
  }, [editor]);

  const handleExport = useCallback(() => {
    editor.getEditorState().read(() => {
      const serializedState = editor.getEditorState().toJSON();
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      exportEditorContent(serializedState, `editor-content-${timestamp}.json`);
    });
  }, [editor]);

  const handleImport = useCallback(() => {
    importInputRef.current?.click();
  }, []);

  const handleImportFile = useCallback(
    async (event) => {
      const file = event.target.files?.[0];
      if (file) {
        const content = await importEditorContent(file);
        if (content) {
          editor.setEditorState(editor.parseEditorState(content));
        }
      }
      // Reset input
      event.target.value = "";
    },
    [editor]
  );

  const handleClear = useCallback(() => {
    if (
      confirm(
        "Are you sure you want to clear all content? This action cannot be undone."
      )
    ) {
      editor.update(() => {
        const root = $getRoot();
        root.clear();
      });
      clearEditorContent();
    }
  }, [editor]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    const editorContainer = document.getElementById("editor-container");
    if (!isFullscreen) {
      editorContainer?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex flex-wrap items-center gap-1 p-2 bg-gradient-to-r from-gray-50 to-gray-100">
        {/* Text Formatting */}
        <div className="flex items-center gap-1">
          <ToolbarButton
            onClick={() => formatText("bold")}
            active={activeStates.isBold}
            title="Bold (Ctrl+B)"
          >
            <Bold size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => formatText("italic")}
            active={activeStates.isItalic}
            title="Italic (Ctrl+I)"
          >
            <Italic size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => formatText("underline")}
            active={activeStates.isUnderline}
            title="Underline (Ctrl+U)"
          >
            <Underline size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => formatText("strikethrough")}
            active={activeStates.isStrikethrough}
            title="Strikethrough"
          >
            <Strikethrough size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => formatText("code")}
            active={activeStates.isCode}
            title="Code"
          >
            <Code size={18} />
          </ToolbarButton>
        </div>

        <ToolbarDivider />

        {/* Headings */}
        <div className="flex items-center gap-1">
          <ToolbarButton onClick={() => formatHeading("h1")} title="Heading 1">
            <Heading1 size={18} />
          </ToolbarButton>
          <ToolbarButton onClick={() => formatHeading("h2")} title="Heading 2">
            <Heading2 size={18} />
          </ToolbarButton>
          <ToolbarButton onClick={() => formatHeading("h3")} title="Heading 3">
            <Heading3 size={18} />
          </ToolbarButton>
        </div>

        <ToolbarDivider />

        {/* Lists */}
        <div className="flex items-center gap-1">
          <ToolbarButton
            onClick={() =>
              editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND)
            }
            title="Bullet List"
          >
            <List size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND)}
            title="Numbered List"
          >
            <ListOrdered size={18} />
          </ToolbarButton>
        </div>

        <ToolbarDivider />

        {/* Alignment */}
        <div className="flex items-center gap-1">
          <ToolbarButton
            onClick={() =>
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")
            }
            title="Align Left"
          >
            <AlignLeft size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() =>
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")
            }
            title="Align Center"
          >
            <AlignCenter size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() =>
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")
            }
            title="Align Right"
          >
            <AlignRight size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() =>
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify")
            }
            title="Justify"
          >
            <AlignJustify size={18} />
          </ToolbarButton>
        </div>

        <ToolbarDivider />

        {/* Insert Elements */}
        <div className="flex items-center gap-1">
          <ToolbarButton onClick={insertImage} title="Insert Image">
            <ImageIcon size={18} />
          </ToolbarButton>
          <ToolbarButton onClick={insertYouTube} title="Embed YouTube Video">
            <Youtube size={18} />
          </ToolbarButton>
          <ToolbarButton onClick={insertTweet} title="Embed Tweet">
            <Twitter size={18} />
          </ToolbarButton>
          <ToolbarButton onClick={insertDivider} title="Insert Divider">
            <Minus size={18} />
          </ToolbarButton>
          <ToolbarButton onClick={insertLink} title="Insert Link">
            <LinkIcon size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => {
              editor.update(() => {
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                  const quote = $createQuoteNode();
                  selection.insertNodes([quote]);
                }
              });
            }}
            title="Quote"
          >
            <Quote size={18} />
          </ToolbarButton>
        </div>

        <ToolbarDivider />

        {/* History */}
        <div className="flex items-center gap-1">
          <ToolbarButton
            onClick={() => editor.dispatchCommand(UNDO_COMMAND)}
            title="Undo (Ctrl+Z)"
          >
            <Undo size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.dispatchCommand(REDO_COMMAND)}
            title="Redo (Ctrl+Y)"
          >
            <Redo size={18} />
          </ToolbarButton>
        </div>

        <ToolbarDivider />

        {/* Save/Load Actions */}
        <div className="flex items-center gap-1">
          <ToolbarButton
            onClick={handleSave}
            title="Save Content"
            active={isSaving}
          >
            <Save size={18} />
          </ToolbarButton>
          <ToolbarButton onClick={handleExport} title="Export to JSON">
            <Download size={18} />
          </ToolbarButton>
          <ToolbarButton onClick={handleImport} title="Import from JSON">
            <Upload size={18} />
          </ToolbarButton>
          <ToolbarButton onClick={handleClear} title="Clear All Content">
            <Trash2 size={18} />
          </ToolbarButton>
        </div>

        <ToolbarDivider />

        {/* Fullscreen & Status */}
        <div className="flex items-center gap-2">
          <ToolbarButton onClick={toggleFullscreen} title="Toggle Fullscreen">
            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </ToolbarButton>

          {lastSaved && (
            <div className="text-xs text-gray-500 ml-2 whitespace-nowrap">
              {isSaving ? (
                <span className="text-blue-600 font-medium">Saving...</span>
              ) : (
                <span>Saved {lastSaved.toLocaleTimeString()}</span>
              )}
            </div>
          )}
        </div>

        {/* Hidden file inputs */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        <input
          ref={importInputRef}
          type="file"
          accept="application/json"
          onChange={handleImportFile}
          className="hidden"
        />
      </div>
    </div>
  );
}

// Auto Focus Plugin
function AutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.focus();
  }, [editor]);

  return null;
}

// Load Saved Content Plugin
// Content is now loaded via initialContent prop, not localStorage
function LoadContentPlugin() {
  return null;
}

// When the editor changes, you can get notified via the OnChangePlugin
// Catch any errors that occur during Lexical updates
function onError(error) {
  console.error(error);
}

export default function Editor({ initialContent, onChange: onChangeCallback }) {
  const handleChange = useCallback(
    (editorState) => {
      editorState.read(() => {
        const root = $getRoot();
        const content = editorState.toJSON();

        // Call the parent callback if provided
        if (onChangeCallback) {
          onChangeCallback(content);
        }
      });
    },
    [onChangeCallback]
  );

  const initialConfig = {
    namespace: "RichTextEditor",
    theme,
    onError,
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      AutoLinkNode,
      LinkNode,
      ImageNode,
      YouTubeNode,
      TweetNode,
      DividerNode,
    ],
    editorState: initialContent
      ? typeof initialContent === "string"
        ? initialContent
        : JSON.stringify(initialContent)
      : undefined,
  };

  return (
    <div id="editor-container" className="w-full h-screen bg-gray-50">
      <LexicalComposer initialConfig={initialConfig}>
        <div className="relative flex flex-col h-full max-w-6xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
          <ToolbarPlugin />

          <div className="flex-1 overflow-auto p-6">
            <RichTextPlugin
              contentEditable={
                <ContentEditable
                  className="
                    editor-input min-h-[500px] outline-none
                    prose prose-lg max-w-none
                    focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                    rounded-lg p-4
                    text-black
                  "
                  aria-placeholder="Start writing your content..."
                />
              }
              placeholder={
                <div className="absolute pt-8 top-28 left-10 text-gray-400 pointer-events-none select-none text-lg">
                  Start writing your content...
                </div>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
          </div>

          <HistoryPlugin />
          <ListPlugin />
          <LinkPlugin />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <OnChangePlugin onChange={handleChange} />
          <LoadContentPlugin />
          <AutoFocusPlugin />
        </div>
      </LexicalComposer>
    </div>
  );
}
