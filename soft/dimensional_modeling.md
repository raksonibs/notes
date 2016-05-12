## Data Warehouse Toolkit
### Kimball group

- users of DW/BI sysetem watch wheels of organization to ealuate performance
-systems are optimized for high-performance queries as users’ questions often require that hundreds or hundreds of thousands of transactions be searched and compressed into an answer set. To further complicate matters, users of a DW/BI system typically demand that historical context be preserved to accurately evaluate the organization’s performance over time.

1. The DW/BI system must make information easily accessible.
  - The data’s structures and labels should mimic the business users’ thought processes and vocabu- lary. Business users want to separate and combine analytic data in endless combinations. 
2. The DW/BI system must present information consistently.
3. The DW/BI system must adapt to change.
4. The DW/BI system must present information in a timely way.
5. The DW/BI system must be a secure bastion that protects the information assets.
6. The DW/BI system must serve as the authoritative and trustworthy foun- dation for improved decision making
7. The business community must accept the DW/BI system to deem it successful.
- With a DW/BI initiative, you have one foot in your information technology (IT) comfort zone while your other foot is on the unfamiliar turf of business users.

#### Dimensional Modeling
- addresses understandale data to business users and delivers fast query perfromance
- make everything as simple as possible not not simpler
- normalized #NF strutuctres divide data into discrete entities in a relationahl table, in some web diagram. Entity relatoonsip models
- 3NF are great in operational processing because update or insert only touches in one places. Normailzied models are too complicated for BI queiries though. e use of normalized modeling in the DW/BI presentation area defeats the intuitive and high-performance retrieval of data. 
- note: A dimensional model contains the same information as a normalized model, but packages the data in a format that delivers user understandability, query performance, and resilience to change.
- Dimensional models implemented in relational database management systems are referred to as star schemas because of their resemblance to a star-like structure. Dimensional models implemented in multidimensional database environments are referred to as online analytical processing (OLAP) cubes,
- ata is loaded into an OLAP cube, it is stored and indexed using formats and techniques that are designed for dimensional data. Performance aggregations or precalculated summary tables are often created and managed by the OLAP cube engine. Consequently, cubes deliver superior query performance because of the precalculations, indexing strategies, and other optimizations. Business users can drill down or up by adding or removing attributes from their analyses with excellent performance without issuing new queries. OLAP cubes also provide more analyti- cally robust functions that exceed those available with SQL. The downside is that you pay a load performance price for these capabilities, especially with large data sets.
- A star schema hosted in a relational database is a good physical foundation for building an OLAP cube, and is generally regarded as a more stable basis for backup and recovery.

- fact table stores the perfromance measurments resulting from organizzations business process. You should strive to store the low-level measurement data resulting from a business process in a single dimen- sional model. Because measurement data is overwhelmingly the largest set of data, it should not be replicated in multiple places for multiple organizational functions around the enterprise. Allowing business users from multiple organizations to access a single centralized repository for each set of measurement data ensures the use of consistent data throughout the enterprise.
- The term fact represents a business measure
- Each row in a fact table corresponds to a measurement event. The data on each row is at a specific level of detail, referred to as the grain, such as one row per product sold on a sales transaction One of the core tenets of dimensional modeling is that all the measurement rows in a fact table must be at the same grain. Having the dis- cipline to create fact tables with a single level of detail ensures that measurements aren’t inappropriately double-counted.

ex: Retail sales Facts
- Date Key
- Product Key
-Store Key
- Promotion Key
- Customer Key
- Sales DOllars
-Sales Unites

- Note: The idea that a measurement event in the physical world has a one-to-one relationship to a single row in the corresponding fact table is a bedrock principle for dimensional modeling. Everything else builds from this foundation.
- The most useful facts are numeric and additive
- Additivity is crucial because BI applications rarely retrieve a single fact table row. Rather, they bring back hundreds, thousands, or even millions of fact rows at a time, and the most useful thing to do with so many rows is to add them up.
- You will see that facts are sometimes semi-additive or even non- additive. Semi-additive facts, such as account balances, cannot be summed across the time dimension. Non-additive facts, such as unit prices, can never be added. You are forced to use counts and averages or are reduced to printing out the fact rows one at a time—an impractical exercise with a billion-row fact table.
- Facts are often described as continuously valued to help sort out what is a fact versus a dimension attribute. The dollar sales amount fact is continuously valued in this example because it can take on virtually any value within a broad range. As an observer, you must stand out in the marketplace and wait for the measurement before you have any idea what the value will be.
***
- It is theoretically possible for a measured fact to be textual; however, the condition rarely arises. In most cases, a textual measurement is a description of something and is drawn from a discrete list of values. The designer should make every e ort to put textual data into dimensions where they can be correlated more e ectively with the other textual dimension attributes and consume much less space. You should not store redundant textual information in fact tables. Unless the text is unique for every row in the fact table, it belongs in the dimension table. A true text fact is rare because the unpredictable content of a text fact, like a freeform text comment, makes it nearly impossible to analyze.
-  It is important that you do not try to fill the fact table with zeros representing no activity because these zeros would overwhelm most fact tables. By including only true activity, fact tables tend to be quite sparse. Despite their sparsity, fact tables usually make up 90 percent or more of the total space consumed by a dimensional model. Fact tables tend to be deep in terms of the number of rows, but narrow in terms of the number of columns. Given their size, you should be judicious about fact table space utilization.
- all fact table grains fall into one of three categories: transaction, periodic snapshot, and accu- mulating snapshot
- All fact tables have two or more foreign keys (refer to the FK notation in Figure 1-2) that connect to the dimension tables’ primary keys. For example, the product key in the fact table always matches a specific product key in the product dimension table. When all the keys in the fact table correctly match their respective primary keys in the corresponding dimension tables, the tables satisfy referential integrity. You access the fact table via the dimension tables joined to it.
- The fact table generally has its own primary key composed of a subset of the for- eign keys. This key is often called a composite key. Every table that has a composite key is a fact table. Fact tables express many-to-many relationships. All others are dimension tables.
- There are usually a handful of dimensions that together uniquely identify each fact table row. After this subset of the overall dimension list has been identified, the rest of the dimensions take on a single value in the context of the fact table row’s primary key. In other words, they go along for the rid
- Dimension tables are integral companions to a fact table. The dimension tables con- tain the textual context associated with a business process measurement event. They describe the “who, what, where, when, how, and why” associated with the event.
- Dimension attributes serve as the primary source of query constraints, group- ings, and report labels. In a query or report request, attributes are identified as the by words. For example, when a user wants to see dollar sales by brand, brand must be available as a dimension attribute.
- Dimension table attributes play a vital role in the DW/BI system. Because they are the source of virtually all constraints and report labels, dimension attributes are critical to making the DW/BI system usable and understandable. Attributes should consist of real words rather than cryptic abbreviations. You should strive to mini- mize the use of codes in dimension tables by replacing them with more verbose textual attributes. 
- In many ways, the data warehouse is only as good as the dimension attributes; the analytic power of the DW/BI environment is directly proportional to the quality and depth of the dimension attributes. The more time spent providing attributes with verbose business terminology, the better. The more time spent populating the domain values in an attribute column, the better. The more time spent ensuring the quality of the values in an attribute column, the better. Robust dimension attributes deliver robust analytic slicing-and-dicing capabilities.
- When triaging operational source data, it is sometimes unclear whether a numeric data element is a fact or dimension attribute. You often make the decision by asking whether the column is a measurement that takes on lots of values and participates in calculations (making it a fact) or is a discretely valued description that is more or less constant and participates in constraints and row labels (making it a dimensional attribute).

ex:  For example, the standard cost for a product seems like a constant attribute of the product but may be changed so often that you decide it is more like a measured fact. Occasionally, you can’t be certain of the classification; it is possible to model the data element either way (or both ways) as a matter of the designer’s prerogative.  Continuously valued numeric observations are almost always facts; discrete numeric observations drawn from a small list are almost always dimension attributes.

- You should resist the perhaps habitual urge to normalize data by storing only the brand code in the product dimension and creating a separate brand lookup table, and likewise for the category description in a separate category lookup table. This normalization is called snowflaking. Instead of third normal form, dimension tables typically are highly denormalized with flattened many-to-one relationships within a single dimension table. Because dimension tables typically are geometrically smaller than fact tables, improving storage e ciency by normalizing or snowflaking has virtually no impact on the overall database size. You should almost always trade o  dimension table space for simplicity and accessibility.
- Each business process is repre- sented by a dimensional model that consists of a fact table containing the event’s numeric measurements surrounded by a halo of dimension tables that contain the textual context that was true at the moment the event occurred. This characteristic star-like structure is often called a star join, a term dating back to the earliest days of relational databases.
- Database optimizers process these simple schemas with fewer joins more e ciently
- A data- base engine can make strong assumptions about first constraining the heavily indexed dimension tables, and then attacking the fact table all at once with the Cartesian product of the dimension table keys satisfying the user’s constraints. Amazingly, using this approach, the optimizer can evaluate arbitrary n-way joins to a fact table in a single pass through the fact table’s index.
- dimensional models are gracefully extensible to accommodate change. The predictable framework of a dimensional model withstands unexpected changes in user behavior. Every dimension is equivalent; all dimensions are symmetrically- equal entry points into the fact table. The dimensional model has no built-in bias regarding expected query patterns. There are no preferences for the business ques- tions asked this month versus the questions asked next month.
- This book illustrates repeatedly that the most granular or atomic data has the most dimensionality. Atomic data that has not been aggregated is the most expres- sive data; this atomic data should be the foundation for every fact table design


ex: 
SELECT
store.district_name,
product.brand,
sum(sales_facts.sales_dollars) AS "Sales Dollars"
FROM store,
product, date, sales_facts
WHERE
date.month_name="January" AND
date.year=2013 AND
store.store_key = sales_facts.store_key AND product.product_key = sales_facts.product_key AND date.date_key = sales_facts.date_key
GROUP BY store.district_name, product.brand

If you study this code snippet line-by-line, the first two lines under the SELECT statement identify the dimension attributes in the report, followed by the aggre- gated metric from the fact table. The FROM clause identifies all the tables involved in the query. The first two lines in the WHERE clause declare the report’s filter, and the remainder declare the joins between the dimension and fact tables. Finally, the GROUP BY clause establishes the aggregation within the report.

- Think of the source systems as outside the data warehouse because presumably you have little or no control over the content and format of the data in these operational systems. The main priorities of the source systems are processing performance and avail- ability. Operational queries against source systems are narrow, one-record-at-a-time queries that are part of the normal transaction flow and severely restricted in their demands on the operational system Source systems maintain little historical data; a good data warehouse can relieve the source systems of much of the responsibility for representing the past

- The extract, transformation, and load (ETL) system of the DW/BI environment consists of a work area, instantiated data structures, and a set of processes. The ETL system is everything between the operational source systems and the DW/BI presentation area. 
ETL System:
• Transform from
source-to-target
• Conform
dimensions
• Normalization
optional
• No user query
support
Design Goals:
• Throughput
• Integrityand
consistency
- We have several strong opinions about the presentation area. First of all, we insist that the data be presented, stored, and accessed in dimensional schemas, either relational star schemas or OLAP cubes. Fortunately, the industry has matured to the point where we’re no longer debating this approach; it has concluded that dimen- sional modeling is the most viable technique for delivering data to DW/BI users.
- Our second stake in the ground about the presentation area is that it must contain detailed, atomic data. Atomic data is required to withstand assaults from unpredictable ad hoc user queries. Although the presentation area also may contain performance-enhancing aggregated data, it is not su cient to deliver these sum- maries without the underlying granular data in a dimensional form. In other words, it is completely unacceptable to store only summary data in dimensional models while the atomic data is locked up in normalized models. 
- The most finely grained data must be available in the presentation area so that users can ask the most precise questions possible. Because users’ requirements are unpredictable and constantly changing, you must provide access to the exquisite details so they can roll up to address the questions of the moment.
- All the dimensional structures must be built using common, conformed dimen- sions. This is the basis of the enterprise data warehouse bus architecture. adherence to the bus architecture is the final stake in the ground for the presentation area. Without shared, conformed dimensions, a dimensional model becomes a standalone application. Isolated stovepipe data sets that cannot be tied together are the bane of the DW/BI movement as they perpetuate incompatible views of the enterprise. If you have any hope of building a robust and integrated DW/BI environment, you must commit to the enterprise bus architecture. 
- Obviously, the ETL system is also highly concerned about data quality, integrity, and consistency. Incoming data is checked for reasonable quality as it enters. Conditions are continually monitored to ensure ETL outputs are of high integrity. Business rules to consistently derive value-add metrics and attributes are applied once by skilled professionals in the ETL system rather than relying on each patron to develop them independently. Yes, that puts extra burden on the ETL team
- A properly designed DW/BI environment trades o  work in the front room BI applications in favor of work in the back room ETL system. Front room work must be done over and over by business users, whereas back room work is done once by the ETL sta .

- Summary data should complement the granular detail solely to provide improved performance for common queries, but not replace the details.  Nothing about a dimensional model prohibits storing substantial history. The amount of history available in dimensional models must only be driven by the business’s requirements.
- The secret to query flexibility is building fact tables at the most granular level. Dimensional models that deliver only summary data are bound to be problematic; users run into analytic brick walls when they try to drill down into details not available in the summary tables. Remember, when you pre-suppose the business question, you’ll likely pre-summarize the data, which can be fatal in the long run.
- God is in the details. Delivering dimensional models populated with the most detailed data possible ensures maximum flexibility and extensibility. Delivering anything less in your dimensional models undermines the foundation necessary for robust business intelligence.

- Many of the core tenets of agile methodologies align with Kimball best practices, including
■ Focus on delivering business value. This has been the Kimball mantra for decades.
■ Value collaboration between the development team and business stakehold- ers. Like the agile camp, we strongly encourage a close partnership with the business.
■ Stress ongoing face-to-face communication, feedback, and prioritization with the business stakeholders.
■ Adapt quickly to inevitably evolving requirements.
■ Tackle development in an iterative, incremental manner.
- lthough this list is compelling, a common criticism of the agile approaches is the lack of planning and architecture, coupled with ongoing governance challenges. The enterprise data warehouse bus matrix is a powerful tool to address these shortcom- ings. The bus matrix provides a framework and master plan for agile development, plus identifies the reusable common descriptive dimensions that provide both data consistency and reduced time-to-market delivery. 
- Without a framework like the enterprise data warehouse bus matrix, some DW/ BI teams have fallen into the trap of using agile techniques to create analytic or reporting solutions in a vacuum. In most situations, the team worked with a small set of users to extract a limited set of source data and make it available to solve their unique problems. The outcome is often a standalone data stovepipe that others can’t leverage, or worse yet, delivers data that doesn’t tie to the organization’s other analytic information. We encourage agility, when appropriate, however building isolated data sets should be avoided. As with most things in life, moderation and balance between extremes is almost always prudent.

#### chapter 2
1. Select the business process.
2. Declare the grain.
3. Identify the dimensions.
4. Identify the facts.

- Declaring the grain is the pivotal step in a dimensional design. The grain establishes exactly what a single fact table row represents. The grain declaration becomes a bind- ing contract on the design. The grain must be declared before choosing dimensions or facts because every candidate dimension or fact must be consistent with the grain. This consistency enforces a uniformity on all dimensional designs that is critical to BI application performance and ease of use. Atomic grain refers to the lowest level at which data is captured by a given business process
- 