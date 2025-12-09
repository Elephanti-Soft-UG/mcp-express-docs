# **Confluence Tool Documentation Guide**

## Overview

This tool integrates with Confluence to automate content management and workflow. It provides **search**, **read**, and **write** capabilities, making it easier to interact with Confluence pages via the API.

## **Configuration**

### **Connection Parameters**

| Parameter       | Required | Description                                                    |
| --------------- | :------: | -------------------------------------------------------------- |
| `access_token`  |    Yes   | OAuth access token to authenticate API requests.               |
| `refresh_token` |    Yes   | OAuth refresh token to obtain a new access token when expired. |

---

### **Search Tool**

The **search tool** allows you to query content from Confluence using the **CQL (Confluence Query Language)**.

#### **Input Schema**

| **Input Parameter** | **Type** | **Description**                                         |
| ------------------- | -------- | ------------------------------------------------------- |
| `search_query`      | String   | The CQL query used to search for content in Confluence. |
| `limit`             | Integer  | The maximum number of results to return. Default: 25.   |

#### **Configuration**

```json
{
  "search_query": "",
  "limit": 25,
  "access_token": "",
  "refresh_token": ""
}
```

#### **Search Tool Configuration Table**

| **Config Parameter** | **Definition**                                         | **Is Secret** | **Jinja** |
| -------------------- | ------------------------------------------------------ | ------------- | --------- |
| `search_query`       | The query to search content in Confluence (CQL query). | No            | No        |
| `limit`              | The maximum number of results to return.               | No            | No        |
| `access_token`       | OAuth access token for authenticating API requests.    | Yes           | Yes       |
| `refresh_token`      | OAuth refresh token to obtain a new access token.      | Yes           | Yes       |

---

### **Read Tool**

The **read tool** is used to retrieve specific Confluence pages based on a **page_id**.

#### **Input Schema**

| **Input Parameter** | **Type** | **Description**                                      |
| ------------------- | -------- | ---------------------------------------------------- |
| `page_id`           | String   | The ID of the page you want to read from Confluence. |

#### **Configuration**

```json
{
  "page_id": "",
  "access_token": "",
  "refresh_token": ""
}
```

#### **Read Tool Configuration Table**

| **Config Parameter** | **Definition**                                      | **Is Secret** | **Jinja** |
| -------------------- | --------------------------------------------------- | ------------- | --------- |
| `page_id`            | The ID of the page to read.                         | No            | No        |
| `access_token`       | OAuth access token for authenticating API requests. | Yes           | Yes       |
| `refresh_token`      | OAuth refresh token to obtain a new access token.   | Yes           | Yes       |

---

### **Write Tool**

The **write tool** is used to create or update pages in Confluence.

#### **Input Schema**

| **Input Parameter** | **Type** | **Description**                               |
| ------------------- | -------- | --------------------------------------------- |
| `space_key`         | String   | The space key where the page will be created. |
| `parent_id`         | String   | The parent page ID for the new page.          |
| `page_title`        | String   | The title of the page to create or update.    |
| `page_content`      | String   | The content of the page to create or update.  |

#### **Configuration**

```json
{
  "space_key": "",
  "parent_id": "",
  "page_title": "",
  "page_content": "",
  "access_token": "",
  "refresh_token": ""
}
```

#### **Write Tool Configuration Table**

| **Config Parameter** | **Definition**                                      | **Is Secret** | **Jinja** |
| -------------------- | --------------------------------------------------- | ------------- | --------- |
| `space_key`          | The space key for creating or updating a page.      | No            | No        |
| `parent_id`          | The parent ID for creating or updating a page.      | No            | No        |
| `page_title`         | The title of the page to create or update.          | No            | No        |
| `page_content`       | The content of the page to create or update.        | No            | No        |
| `access_token`       | OAuth access token for authenticating API requests. | Yes           | Yes       |
| `refresh_token`      | OAuth refresh token to obtain a new access token.   | Yes           | Yes       |

---

## **Token Refresh Process**

When the **access_token** expires, the **refresh_token** is used to obtain a new access token.

### **Connector & Router Logic**

1. **Connector**:

   * Checks for a **401 Unauthorized** status from the API.
   * If received, it calls the **Atlassian OAuth token URL**: `https://auth.atlassian.com/oauth/token` to get new tokens.

2. **Router**:

   * The router receives the **x-credentials** header from the connector, which includes the **new access_token** and **refresh_token**.
   * It checks the **x-cred-updated** flag to see if the tokens need to be updated.
   * If **x-cred-updated** is **true**, the router updates the tokens in the database.

### **Example Header**

```json
{
  "x-credentials": {
    "access_token": "new_access_token",
    "refresh_token": "new_refresh_token"
  }
}
```

---

## **Best Practices**

### **Security**

* Always store **access_token** and **refresh_token** securely, ideally in a **secure storage** or **environment variables**.
* Use **OAuth scopes** that grant only the necessary permissions to the tool.
* Rotate tokens regularly and monitor for unauthorized access.

### **Error Handling**

* Ensure that token expiration is handled gracefully with automatic token refresh.
* Handle API rate limits and backoff strategies for retrying failed requests.

---

## **Screenshots**

* **Search Tool** Configuration: *(Add screenshot here)*
* **Read Tool** Configuration: *(Add screenshot here)*
* **Write Tool** Configuration: *(Add screenshot here)*

---

### **Conclusion**

This documentation provides an overview of the **Confluence tool** integration, highlighting the configuration parameters for **search**, **read**, and **write** operations. It also explains the **token refresh logic** to keep your integration secure and up-to-date.

---

Let me know if you need further modifications or additions!
