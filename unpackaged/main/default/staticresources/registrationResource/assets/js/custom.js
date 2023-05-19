$(document).ready(function(){
// Tooltip Start
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})
// Tooltip End

// User Dropdown Section Header Top Right Start
$(".dropdown-user-logout-manage-wrap").hide();
$(".header-user-status-outer").click(function(){
    $(".dropdown-user-logout-manage-wrap").toggle();
  });
// User Dropdown Section Header Top Right End

// Uploads Files Documents Option Section Start
$(".uploads-files-documents-option-wrap").hide();
$(".uploads-files-documents-option-dots").click(function(){
    $(".uploads-files-documents-option-wrap").toggle();
  });
// Uploads Files Documents Option Section End

// Table Filter Dropdown Start
$(".table-filter-dropdown-wrap").hide();
$(".engagements-table-filter-wrap .filter-button").click(function(){
    $(".table-filter-dropdown-wrap").toggle();
  });
// Table Filter Dropdown End

});
